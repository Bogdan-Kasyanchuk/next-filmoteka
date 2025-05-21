import Image from 'next/image';
import Link from 'next/link';

import { PARAMETERS, IMG_SIZES } from '@/helpers/parameters';
import { MovieMapper } from '@/types';

type Props = {
    movie: MovieMapper
}

export default function MovieCard(props: Props) {
    return (
        <Link
            href={`/movies/${props.movie.id}`}
            className='с-movie-card'
        >
            <div className='с-movie-card__cover'>
                <Image
                    src={
                        props.movie.poster_path
                            ? `${PARAMETERS.URL_IMG}/${IMG_SIZES.MEDIA_CARD_COVER}/${props.movie.poster_path}`
                            : '/img/poster-not-available.jpg'
                    }
                    sizes="(max-width: 479px) 173px, (max-width: 767px) 213px, (max-width: 1023px) 230px, 294px"
                    alt={props.movie.title}
                    fill
                />
            </div>

            <div className='с-movie-card__tag'>
                {props.movie.media_type}
            </div>

            <div className='с-movie-card__average'>
                {props.movie.vote_average}
            </div>

            <div className='с-movie-card__footer'>
                <p className='с-movie-card__footer-title'>
                    {props.movie.title}
                </p>
            </div>
        </Link>
    );
};
