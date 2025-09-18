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
        <div className='c-current-movie'>
            <div className='c-current-movie__cover'>
                <Image
                    src={
                        props.movie.poster_path
                            ? `${PARAMETERS.URL_IMG}${IMG_SIZES.MEDIA_CARD_CURRENT_COVER}${props.movie.poster_path}`
                            : '/img/poster-not-available.jpg'
                    }
                    sizes='92px'
                    alt={props.movie.title}
                    fill
                />
            </div>

            <div className='c-current-movie__info'>
                <Title
                    className='c-current-movie__title'
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

                <div className='c-current-movie__tags'>
                    <div className='c-current-movie__tag c-current-movie__tag--type'>
                        {props.movie.media_type}
                    </div>

                    <div className='c-current-movie__tag c-current-movie__tag--average'>
                        {Math.round(props.movie.vote_average * 10)}
                        <span>%</span>
                    </div>

                    {
                        props.movie.adult &&
                        <div className='c-current-movie__tag c-current-movie__tag--adult'>
                            18<span>+</span>
                        </div>
                    }
                </div>

                {
                    props.movie.genres.length > 0 &&
                    <div className='c-current-movie__genres'>
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