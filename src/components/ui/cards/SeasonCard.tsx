'use client';

import Image from 'next/image';
import { useFormatter } from 'next-intl';

import { IMG_SIZES } from '@/datasets/constants';
import { PLACEHOLDERS } from '@/datasets/placeholders';
import { imageUrl, pagesSeasonUrl } from '@/routes';
import { Link } from '@/services/i18n/navigation';
import { SeasonMapper } from '@/types';

type Props = {
    season: SeasonMapper,
    tvShowId: string
};

export default function SeasonCard(props: Props) {
    const format = useFormatter();
        
    return (
        <Link
            href={ pagesSeasonUrl(props.tvShowId, props.season.season_number) }
            className="с-season-card"
        >
            <div className="с-season-card__cover">
                <Image
                    src={
                        props.season.poster_path
                            ? imageUrl(IMG_SIZES.SEASON_COVER, props.season.poster_path)
                            : '/img/poster-not-available.jpg'
                    }
                    sizes="106px"
                    alt={ props.season.name }
                    placeholder={ PLACEHOLDERS[ '2x3' ] }
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
                            <dd>{ format.dateTime(props.season.air_date) }</dd>
                        </div>
                    }

                    <div className="с-season-card__info-list-item с-season-card__info-list-item--rating">
                        <dt>Rating:</dt>
                        <dd>
                            { Math.round((props.season.vote_average ?? 0) * 10) }
                            <span>%</span>
                        </dd>
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
