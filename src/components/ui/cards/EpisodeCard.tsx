import Image from 'next/image';

import { PARAMETERS, IMG_SIZES } from '@/helpers/parameters';
import { EpisodeMapper } from '@/types';
import { formatDate } from '@/utils/formateDate';

type Props = {
    episode: EpisodeMapper
}

export default function EpisodeCard(props: Props) {
    console.log(`${PARAMETERS.URL_IMG}${IMG_SIZES.EPISODE_CARD_COVER}${props.episode.still_path}`);

    return (
        <div className='с-movie-card'>
            <div className='с-movie-card__cover'>
                <Image
                    src={
                        props.episode.still_path
                            ? `${PARAMETERS.URL_IMG}${IMG_SIZES.EPISODE_CARD_COVER}${props.episode.still_path}`
                            : '/img/poster-not-available.jpg'
                    }
                    sizes="(max-width: 479px) 173px, (max-width: 767px) 213px, (max-width: 1023px) 230px, 294px"
                    alt={props.episode.name}
                    fill
                />
            </div>

            <div className='с-season-card__info'>
                <p className='с-season-card__info-name'>
                    {props.episode.name}
                </p>

                <ul className='с-season-card__info-list'>
                    {
                        props.episode.air_date &&
                        <li className='с-season-card__info-list-item'>
                            <span>Air date:</span>
                            <span>{formatDate(props.episode.air_date, 'DD.MM.YYYY')}</span>
                        </li>
                    }

                    <li className='с-season-card__info-list-item'>
                        <span>Type:</span>
                        <span>{props.episode.episode_type}</span>
                    </li>

                    <li className='с-season-card__info-list-item'>
                        <span>Season:</span>
                        <span>{props.episode.season_number}</span>
                    </li>

                    <li className='с-season-card__info-list-item'>
                        <span>Episode:</span>
                        <span>{props.episode.episode_number}</span>
                    </li>

                    <li className='с-season-card__info-list-item'>
                        <span>Rating:</span>
                        <span>{Math.round(props.episode.vote_average * 10)}</span>
                    </li>

                    <li className='с-season-card__info-list-item'>
                        <span>Votes:</span>
                        <span>{props.episode.vote_count ?? 0}</span>
                    </li>

                    <li className='с-season-card__info-list-item'>
                        <span>Runtime:</span>
                        <span>{props.episode.runtime ?? 0}min</span>
                    </li>
                </ul>
            </div>

            {
                props.episode.overview &&
                <div className='с-movie-details__overview'>
                    <p className='с-movie-details__overview-title'>
                        Overview:
                    </p>
                    <p className='с-movie-details__overview-text'>
                        {props.episode.overview}
                    </p>
                </div>
            }
        </div>
    );
};
