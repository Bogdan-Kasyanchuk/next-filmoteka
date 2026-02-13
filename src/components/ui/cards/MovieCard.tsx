'use client';

import Image from 'next/image';
import { useExtracted, useFormatter } from 'next-intl';

import { IMG_SIZES } from '@/datasets/constants';
import { PLACEHOLDERS } from '@/datasets/placeholders';
import { imageUrl, pagesMovieUrl } from '@/routes';
import { Link } from '@/services/i18n/navigation';
import { MovieMapper } from '@/types';

type Props = {
    movie: MovieMapper,
    preload?: boolean
};

export default function MovieCard(props: Props) {
    const format = useFormatter();

    const t = useExtracted();
    
    return (
        <div className="с-movie-card">
            <div className="с-movie-card__cover">
                <Image
                    src={
                        props.movie.poster_path
                            ? imageUrl(IMG_SIZES.MEDIA_COVER, props.movie.poster_path)
                            : '/img/poster-not-available.jpg'
                    }
                    sizes="(max-width: 479px) 174px, (max-width: 767px) 214px, (max-width: 1023px) 231px, 295px"
                    alt={ props.movie.title }
                    placeholder={ PLACEHOLDERS[ '2x3' ] }
                    fill
                    preload={ props.preload }
                    loading={ props.preload ? 'eager' : 'lazy' }
                />
            </div>

            <div className="с-movie-card__tags">
                <div className="с-movie-card__tag с-movie-card__tag--type">
                    { t('Movie') }
                </div>

                {
                    props.movie.release_date &&
                    <div className="с-movie-card__tag с-movie-card__tag--date">
                        { format.dateTime(props.movie.release_date, { year: 'numeric' }) }
                    </div>
                }

                {
                    props.movie.adult &&
                    <div className="с-movie-card__tag с-movie-card__tag--adult">
                        18<span>+</span>
                    </div>
                }

                <div className="с-movie-card__tag с-movie-card__tag--average">
                    { Math.round((props.movie.vote_average ?? 0) * 10) }
                    <span>%</span>
                </div>
            </div>

            <div className="с-movie-card__footer">
                <Link
                    href={ pagesMovieUrl(props.movie.id) }
                    className="с-movie-card__footer-title u-overlay"
                    title={ props.movie.title }
                >
                    { props.movie.title }
                </Link>
            </div>
        </div>
    );
}
