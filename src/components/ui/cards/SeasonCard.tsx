import Image from 'next/image';
import Link from 'next/link';

import { IMG_SIZES } from '@/helpers/parameters';
import { imageUrl, pagesSeasonUrl } from '@/routes';
import { SeasonMapper } from '@/types';
import { formatDate } from '@/utils/formateDate';

type Props = {
    season: SeasonMapper,
    tvShowId: string
};

export default function SeasonCard(props: Props) {
    return (
        <Link
            href={ pagesSeasonUrl(props.tvShowId, props.season.season_number) }
            className="с-season-card"
        >
            <div className="с-season-card__cover">
                <Image
                    src={
                        props.season.poster_path
                            ? imageUrl(IMG_SIZES.SEASON_CARD_COVER, props.season.poster_path)
                            : '/img/poster-not-available.jpg'
                    }
                    sizes="121px"
                    alt={ props.season.name }
                    fill
                />
            </div>

            <div className="с-season-card__info">
                <p className="с-season-card__info-name">
                    { props.season.name }
                </p>

                <dl className="с-season-card__info-list">
                    {
                        props.season.air_date &&
                        <div className="с-season-card__info-list-item">
                            <dt>Air date:</dt>
                            <dd>{ formatDate(props.season.air_date, 'DD.MM.YYYY') }</dd>
                        </div>
                    }

                    <div className="с-season-card__info-list-item">
                        <dt>Rating:</dt>
                        <dd>{ Math.round(props.season.vote_average ?? 0 * 10) }</dd>
                    </div>

                    <div className="с-season-card__info-list-item">
                        <dt>Season:</dt>
                        <dd>{ props.season.season_number }</dd>
                    </div>

                    <div className="с-season-card__info-list-item">
                        <dt>Episodes:</dt>
                        <dd>{ props.season.episode_count }</dd>
                    </div>
                </dl>
            </div>
        </Link>
    );
}
