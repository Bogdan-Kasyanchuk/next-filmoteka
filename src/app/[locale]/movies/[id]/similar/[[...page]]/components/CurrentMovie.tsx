'use client';

import Image from 'next/image';
import { useExtracted, useFormatter } from 'next-intl';
import { Fragment } from 'react';

import Title from '@/components/ui/typography/Title';
import { IMG_SIZES } from '@/datasets/constants';
import { PLACEHOLDERS } from '@/datasets/placeholders';
import { imageUrl } from '@/helpers/externalUrls';
import { pagesMovieUrl } from '@/routes';
import { Link } from '@/services/i18n/navigation';
import { CurrentMovieMapper } from '@/types';

type Props = {
    movie: CurrentMovieMapper,
    id: string
};

export default function CurrentMovie(props: Props) {
    const format = useFormatter();

    const t = useExtracted();

    const releaseDate = props.movie.release_date &&
    format.dateTime( props.movie.release_date, { year: 'numeric' });
        
    return (
        <div className="c-current-movie">
            <div className="c-current-movie__cover">
                <Image
                    src={
                        props.movie.poster_path
                            ? imageUrl(IMG_SIZES.MEDIA_CURRENT_COVER, props.movie.poster_path)
                            : '/img/poster-not-available.jpg'
                    }
                    sizes="81px"
                    alt={ props.movie.title }
                    placeholder={ PLACEHOLDERS[ '2x3' ] }
                    fill
                    preload
                    loading="eager"
                />
            </div>

            <div className="c-current-movie__info">
                <Title
                    className="c-current-movie__title"
                    variant={ 3 }
                >
                    <Link
                        href={ pagesMovieUrl(props.id) }
                        title={ `${ props.movie.title } ${ releaseDate ?? '' }` }
                        className="u-link-color"
                    >
                        { props.movie.title }
                        { releaseDate && <>&nbsp;({ releaseDate })</> }
                    </Link>
                </Title>

                <div className="c-current-movie__tags">
                    <div className="c-current-movie__tag c-current-movie__tag--type">
                        { t('Movie') }
                    </div>

                    <div className="c-current-movie__tag c-current-movie__tag--average">
                        { Math.round((props.movie.vote_average ?? 0) * 10) }
                        <span>%</span>
                    </div>

                    {
                        props.movie.adult &&
                        <div className="c-current-movie__tag c-current-movie__tag--adult">
                            18<span>+</span>
                        </div>
                    }
                </div>

                {
                    props.movie.genres.length > 0 &&
                    <div className="c-current-movie__genres">
                        {
                            props.movie.genres.map(
                                (genre, index) => (
                                    <Fragment key={ index }>
                                        { index !== 0 && <>&nbsp;|&nbsp;</> }
                                        { genre }
                                    </Fragment>
                                ))
                        }
                    </div>
                }
            </div>
        </div>
    );
}