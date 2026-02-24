'use client';

import Image from 'next/image';
import { useExtracted, useFormatter } from 'next-intl';

import { IMG_SIZES } from '@/datasets/constants';
import { PLACEHOLDERS } from '@/datasets/placeholders';
import { imageUrl } from '@/helpers/externalUrls';
import { pagesSeasonUrl } from '@/routes';
import { Link } from '@/services/i18n/navigation';
import { SeasonMapper } from '@/types';

type Props = {
    season: SeasonMapper,
    tvShowId: string
};

export default function SeasonCard(props: Props) {
    const format = useFormatter();

    const t = useExtracted();
        
    return (
        <Link
            href={ pagesSeasonUrl(props.tvShowId, props.season.season_number) }
            className="c-season-card"
        >
            <div className="c-season-card__cover">
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

            <div className="c-season-card__info">
                <p className="c-season-card__info-name">
                    { props.season.name }
                </p>

                <dl className="c-season-card__info-list">
                    {
                        props.season.air_date &&
                        <div className="c-season-card__info-list-item">
                            <dt>{ t('Air date:') }</dt>
                            <dd>{ format.dateTime(props.season.air_date) }</dd>
                        </div>
                    }

                    <div className="c-season-card__info-list-item c-season-card__info-list-item--rating">
                        <dt>{ t('Rating:') }</dt>
                        <dd>
                            { Math.round((props.season.vote_average ?? 0) * 10) }
                            <span>%</span>
                        </dd>
                    </div>

                    <div className="c-season-card__info-list-item">
                        <dt>{ t('Season:') }</dt>
                        <dd>{ props.season.season_number }</dd>
                    </div>

                    <div className="c-season-card__info-list-item">
                        <dt>{ t('Episodes:') }</dt>
                        <dd>{ props.season.episode_count }</dd>
                    </div>
                </dl>
            </div>
        </Link>
    );
}
