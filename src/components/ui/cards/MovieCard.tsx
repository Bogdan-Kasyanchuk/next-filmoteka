import Image from 'next/image';
import Link from 'next/link';

import { MovieMapper } from '@/types';

type Props = {
    movie: MovieMapper
}

export default function MovieCard(props: Props) {
    const normalizedTitle = props.movie.title || props.movie.original_title;

    return (
        <Link
            href={`/movies/${props.movie.id}`}
            className='с-movie-card'
        >
            <div className='с-movie-card__cover'>
                <Image
                    src={
                        props.movie.poster_path
                            ? `${process.env.NEXT_PUBLIC_BASE_URL_IMG}${props.movie.poster_path}`
                            : '/img/poster-not-available.jpg'
                    }
                    sizes="294px"
                    alt={normalizedTitle}
                    fill
                />
            </div>

            <div className='с-movie-card__tag'>
                {props.movie.media_type}
            </div>

            <div className='с-movie-card__footer'>
                <p className='с-movie-card__footer-title'>
                    {normalizedTitle}
                </p>
                <p className='с-movie-card__footer-average'>
                    {props.movie.vote_average}
                </p>
            </div>
        </Link>
    );
};
