import Image from 'next/image';

import { IMG_SIZES } from '@/datasets/constants';
import { imageUrl } from '@/routes';
import { EpisodeMapper } from '@/types';
import formatDate from '@/utils/formateDate';

import Popover from '../data-display/Popover';

type Props = {
    episode: EpisodeMapper
};

export default function EpisodeCard(props: Props) {
    return (
        <div className="с-episode-card">
            <div className="с-episode-card__cover">
                <Image
                    src={
                        props.episode.still_path
                            ? imageUrl(IMG_SIZES.EPISODE_COVER, props.episode.still_path)
                            : '/img/poster-not-available.jpg'
                    }
                    sizes="(max-width: 479px) 175px, (max-width: 1319px) 216px, 300px"
                    alt={ props.episode.name }
                    fill
                />
            </div>

            <div className="с-episode-card__info">
                <p
                    className="с-episode-card__info-name"
                    title={ props.episode.name }
                >
                    { props.episode.name }
                </p>

                <dl className="с-episode-card__info-list">
                    {
                        props.episode.air_date &&
                        <div className="с-episode-card__info-list-item">
                            <dt>Air date:</dt>
                            <dd>{ formatDate(props.episode.air_date, 'DD.MM.YYYY') }</dd>
                        </div>
                    }

                    <div className="с-episode-card__info-list-item">
                        <dt>Type:</dt>
                        <dd className="capitalize">{ props.episode.episode_type }</dd>
                    </div>

                    <div className="с-episode-card__info-list-item">
                        <dt>Episode:</dt>
                        <dd>{ props.episode.episode_number }</dd>
                    </div>

                    <div className="с-episode-card__info-list-item с-episode-card__info-list-item--rating">
                        <dt>Rating:</dt>
                        <dd>
                            { Math.round((props.episode.vote_average ?? 0) * 10) }
                            <span>%</span>
                        </dd>
                    </div>

                    <div className="с-episode-card__info-list-item">
                        <dt>Votes:</dt>
                        <dd>{ props.episode.vote_count ?? 0 }</dd>
                    </div>

                    <div className="с-episode-card__info-list-item">
                        <dt>Runtime:</dt>
                        <dd>{ props.episode.runtime ?? 0 }min</dd>
                    </div>
                </dl>
            </div>

            {
                props.episode.overview &&
                <Popover
                    trigger={
                        <button
                            type="button"
                            className="с-episode-card__overview-trigger"
                        >
                            i
                        </button>
                    }
                    classNames={
                        {
                            content: 'с-episode-card__overview'
                        }
                    }
                    isArrow
                >
                    { props.episode.overview }
                </Popover>
            }
        </div>
    );
}
