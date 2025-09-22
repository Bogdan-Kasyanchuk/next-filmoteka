import Image from 'next/image';

import { PARAMETERS, IMG_SIZES } from '@/helpers/parameters';
import { EpisodeMapper } from '@/types';
import { formatDate } from '@/utils/formateDate';

import Popover from '../data-display/Popover';

type Props = {
    episode: EpisodeMapper
}

export default function EpisodeCard(props: Props) {
    return (
        <div className='с-episode-card'>
            <div className='с-episode-card__cover'>
                <Image
                    src={
                        props.episode.still_path
                            ? `${PARAMETERS.URL_IMG}/${IMG_SIZES.EPISODE_CARD_COVER}${props.episode.still_path}`
                            : '/img/poster-not-available.jpg'
                    }
                    sizes='(max-width: 479px) 175px, (max-width: 1319px) 216px, 300px'
                    alt={props.episode.name}
                    fill
                />
            </div>

            <div className='с-episode-card__info'>
                <p
                    className='с-episode-card__info-name'
                    title={props.episode.name}
                >
                    {props.episode.name}
                </p>

                <ul className='с-episode-card__info-list'>
                    {
                        props.episode.air_date &&
                        <li className='с-episode-card__info-list-item'>
                            <span>Air date:</span>
                            <span>{formatDate(props.episode.air_date, 'DD.MM.YYYY')}</span>
                        </li>
                    }

                    <li className='с-episode-card__info-list-item'>
                        <span>Type:</span>
                        <span className='capitalize'>{props.episode.episode_type}</span>
                    </li>

                    <li className='с-episode-card__info-list-item'>
                        <span>Season:</span>
                        <span>{props.episode.season_number}</span>
                    </li>

                    <li className='с-episode-card__info-list-item'>
                        <span>Episode:</span>
                        <span>{props.episode.episode_number}</span>
                    </li>

                    <li className='с-episode-card__info-list-item'>
                        <span>Rating:</span>
                        <span>{Math.round(props.episode.vote_average * 10)}</span>
                    </li>

                    <li className='с-episode-card__info-list-item'>
                        <span>Votes:</span>
                        <span>{props.episode.vote_count ?? 0}</span>
                    </li>

                    <li className='с-episode-card__info-list-item'>
                        <span>Runtime:</span>
                        <span>{props.episode.runtime ?? 0}min</span>
                    </li>
                </ul>
            </div>

            {
                props.episode.overview &&
                <Popover
                    trigger={
                        <button
                            type='button'
                            className='с-episode-card__overview-trigger'
                        >
                            i
                        </button>
                    }
                    content={props.episode.overview}
                    classNames={
                        {
                            content: 'с-episode-card__overview',
                            arrow: 'с-episode-card__overview-arrow'
                        }
                    }
                    isArrow
                />
            }
        </div>
    );
};
