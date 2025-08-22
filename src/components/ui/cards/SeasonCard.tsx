import Image from 'next/image';
import Link from 'next/link';

import { PARAMETERS, IMG_SIZES } from '@/helpers/parameters';
import { SeasonMapper } from '@/types';
import { formatDate } from '@/utils/formateDate';

type Props = {
    season: SeasonMapper,
    tvShowId: string
}

export default function SeasonCard(props: Props) {
    return (
        <Link
            href={`/tv-shows/${props.tvShowId}/season-${props.season.season_number}`}
            className='с-season-card'
        >
            <div className='с-season-card__cover'>
                <Image
                    src={
                        props.season.poster_path
                            ? `${PARAMETERS.URL_IMG}${IMG_SIZES.SEASON_CARD_COVER}${props.season.poster_path}`
                            : '/img/poster-not-available.jpg'
                    }
                    sizes="130px"
                    alt={props.season.name}
                    fill
                />
            </div>

            <div className='с-season-card__info'>
                <p className='с-season-card__info-name'>
                    {props.season.name}
                </p>

                <ul className='с-season-card__info-list'>
                    {
                        props.season.air_date &&
                        <li className='с-season-card__info-list-item'>
                            <span>Air date:</span>
                            <span>{formatDate(props.season.air_date, 'DD.MM.YYYY')}</span>
                        </li>
                    }

                    <li className='с-season-card__info-list-item'>
                        <span>Rating:</span>
                        <span>{Math.round(props.season.vote_average * 10)}</span>
                    </li>

                    <li className='с-season-card__info-list-item'>
                        <span>Season:</span>
                        <span>{props.season.season_number}</span>
                    </li>

                    <li className='с-season-card__info-list-item'>
                        <span>Episodes:</span>
                        <span>{props.season.episode_count}</span>
                    </li>
                </ul>
            </div>
        </Link>
    );
};
