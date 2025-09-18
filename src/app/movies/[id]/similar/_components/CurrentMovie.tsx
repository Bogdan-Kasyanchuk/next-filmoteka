import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

import Title from '@/components/ui/typography/Title';
import { IMG_SIZES, PARAMETERS } from '@/helpers/parameters';
import { pagesMovieshUrl } from '@/routes';
import { CurrentMovieMapper } from '@/types';
import { formatDate } from '@/utils/formateDate';

type Props = {
    movie: CurrentMovieMapper;
    id: string;
}

export default function CurrentMovie(props: Props) {
    return (
        <div className='p-movie-similar__current-movie'>
            <div className='p-movie-similar__current-movie-cover'>
                <Image
                    src={
                        props.movie.poster_path
                            ? `${PARAMETERS.URL_IMG}${IMG_SIZES.MEDIA_CARD_CURRENT_COVER}${props.movie.poster_path}`
                            : '/img/poster-not-available.jpg'
                    }
                    sizes="92px"
                    alt={props.movie.title}
                    fill
                />
            </div>

            <div className='p-movie-similar__current-movie-info'>
                <Title
                    className='p-movie-similar__current-movie-title'
                    variant={3}
                >
                    <Link
                        href={`${pagesMovieshUrl()}/${props.id}`}
                        title={
                            `${props.movie.title} ${formatDate(props.movie.release_date, 'YYYY')}`
                        }
                        className='u-link-color'
                    >
                        {props.movie.title}&nbsp;({formatDate(props.movie.release_date, 'YYYY')})
                    </Link>
                </Title>

                <div className='p-movie-similar__current-movie-tags'>
                    <div className='p-movie-similar__current-movie-tag p-movie-similar__current-movie-tag--type'>
                        {props.movie.media_type}
                    </div>

                    <div className='p-movie-similar__current-movie-tag p-movie-similar__current-movie-tag--average'>
                        {Math.round(props.movie.vote_average * 10)}
                        <span>%</span>
                    </div>

                    {
                        props.movie.adult &&
                        <div className='p-movie-similar__current-movie-tag p-movie-similar__current-movie-tag--adult'>
                            18<span>+</span>
                        </div>
                    }
                </div>

                {
                    props.movie.genres.length > 0 &&
                    <div className='p-movie-similar__current-movie-genres'>
                        {
                            props.movie.genres.map(
                                (genre, index) => (
                                    <Fragment key={index}>
                                        {index !== 0 && <>&nbsp;|&nbsp;</>}
                                        {genre}
                                    </Fragment>
                                ))
                        }
                    </div>
                }
            </div>
        </div >
    );
}