'use client';

import Image from 'next/image';
import { useExtracted, useFormatter } from 'next-intl';

import { IMG_SIZES } from '@/datasets/constants';
import { PLACEHOLDERS } from '@/datasets/placeholders';
import { imageUrl, pagesTVShowUrl } from '@/routes';
import { Link } from '@/services/i18n/navigation';
import { TVShowMapper } from '@/types';

type Props = {
    tvShow: TVShowMapper,
    preload?: boolean
};

export default function TVShowCard(props: Props) {
    const format = useFormatter();

    const t = useExtracted();
        
    return (
        <div className="c-media-card">
            <div className="c-media-card__cover">
                <Image
                    src={
                        props.tvShow.poster_path
                            ? imageUrl(IMG_SIZES.MEDIA_COVER, props.tvShow.poster_path)
                            : '/img/poster-not-available.jpg'
                    }
                    sizes="(max-width: 479px) 174px, (max-width: 767px) 214px, (max-width: 1023px) 231px, 295px"
                    alt={ props.tvShow.name }
                    placeholder={ PLACEHOLDERS[ '2x3' ] }
                    fill
                    preload={ props.preload }
                    loading={ props.preload ? 'eager' : 'lazy' }
                />
            </div>

            <div className="c-media-card__tags">
                <div className="c-media-card__tag c-media-card__tag--type">
                    { t('TV') }
                </div>

                {
                    props.tvShow.first_air_date &&
                    <div className="c-media-card__tag c-media-card__tag--date">
                        { format.dateTime(props.tvShow.first_air_date, { year: 'numeric' }) }
                    </div>
                }

                {
                    props.tvShow.adult &&
                    <div className="c-media-card__tag c-media-card__tag--adult">
                        18<span>+</span>
                    </div>
                }

                <div className="c-media-card__tag c-media-card__tag--average">
                    { Math.round((props.tvShow.vote_average ?? 0) * 10) }
                    <span>%</span>
                </div>
            </div>

            <div className="c-media-card__footer">
                <Link
                    href={ pagesTVShowUrl(props.tvShow.id) }
                    className="c-media-card__footer-title u-overlay"
                    title={ props.tvShow.name }
                >
                    { props.tvShow.name }
                </Link>
            </div>
        </div>
    );
}
