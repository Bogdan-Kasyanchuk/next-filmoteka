import Image from 'next/image';

import { PARAMETERS, IMG_SIZES } from '@/helpers/parameters';
import { EpisodeMapper } from '@/types';

type Props = {
    episode: EpisodeMapper
}

// air_date: string,
// episode_number: number,
// episode_type: EpisodeType,
// name: string,
// overview: string,
// runtime: number,
// season_number: number,
// still_path: string,
// vote_average: number,
// vote_count: number,

export default function EpisodeCard(props: Props) {
    return (
        // <Link
        //     href={`/movies/${props.movie.id}`}
        //     className='с-movie-card'
        // >
        //     <div className='с-movie-card__cover'>
        //         <Image
        //             src={
        //                 props.movie.poster_path
        //                     ? `${PARAMETERS.URL_IMG}${IMG_SIZES.MEDIA_CARD_COVER}${props.movie.poster_path}`
        //                     : '/img/poster-not-available.jpg'
        //             }
        //             sizes="(max-width: 479px) 173px, (max-width: 767px) 213px, (max-width: 1023px) 230px, 294px"
        //             alt={props.movie.title}
        //             fill
        //         />
        //     </div>

        //     <div className='с-movie-card__tags'>
        //         <div className='с-movie-card__tag с-movie-card__tag--type'>
        //             {props.movie.media_type}
        //         </div>

        //         {
        //             props.movie.adult &&
        //             <div className='с-movie-card__tag с-movie-card__tag--adult'>
        //                 18<span>+</span>
        //             </div>
        //         }

        //         <div className='с-movie-card__tag с-movie-card__tag--average'>
        //             {Math.round(props.movie.vote_average * 10)}
        //             <span>%</span>
        //         </div>
        //     </div>

        //     <div className='с-movie-card__footer'>
        //         <p className='с-movie-card__footer-title'>
        //             {props.movie.title}
        //         </p>
        //     </div>
        // </Link>
        <div>1</div>
    );
};
