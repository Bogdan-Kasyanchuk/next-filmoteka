import Image from 'next/image';
import Link from 'next/link';

import { IMG_SIZES } from '@/datasets/constants';
import { imageUrl, pagesTVShowUrl } from '@/routes';
import { TVShowMapper } from '@/types';
import formatDate from '@/utils/formateDate';

type Props = {
    tvShow: TVShowMapper,
    priority?: boolean
};

export default function TVShowCard(props: Props) {
    return (
        <div className="с-tv-show-card">
            <div className="с-tv-show-card__cover">
                <Image
                    src={
                        props.tvShow.poster_path
                            ? imageUrl(IMG_SIZES.MEDIA_COVER, props.tvShow.poster_path)
                            : '/img/poster-not-available.jpg'
                    }
                    sizes="(max-width: 479px) 174px, (max-width: 767px) 214px, (max-width: 1023px) 231px, 295px"
                    alt={ props.tvShow.name }
                    fill
                    priority={ props.priority }
                />
            </div>

            <div className="с-tv-show-card__tags">
                <div className="с-tv-show-card__tag с-tv-show-card__tag--type">
                    { props.tvShow.media_type }
                </div>

                <div className="с-tv-show-card__tag с-tv-show-card__tag--date">
                    { formatDate(props.tvShow.first_air_date, 'YYYY') }
                </div>

                {
                    props.tvShow.adult &&
                    <div className="с-tv-show-card__tag с-tv-show-card__tag--adult">
                        18<span>+</span>
                    </div>
                }

                <div className="с-tv-show-card__tag с-tv-show-card__tag--average">
                    { Math.round((props.tvShow.vote_average ?? 0) * 10) }
                    <span>%</span>
                </div>
            </div>

            <div className="с-tv-show-card__footer">
                <Link
                    href={ pagesTVShowUrl(props.tvShow.id) }
                    className="с-tv-show-card__footer-title u-overlay"
                    title={ props.tvShow.name }
                >
                    { props.tvShow.name }
                </Link>
            </div>
        </div>
    );
}
