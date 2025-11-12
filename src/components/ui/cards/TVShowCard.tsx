import Image from 'next/image';
import Link from 'next/link';

import { IMG_SIZES } from '@/helpers/parameters';
import { imageUrl, pagesTVShowUrl } from '@/routes';
import { TVShowMapper } from '@/types';

type Props = {
    tvShow: TVShowMapper
};

export default function TVShowCard(props: Props) {
    return (
        <Link
            href={ pagesTVShowUrl(props.tvShow.id) }
            className="с-tv-show-card"
        >
            <div className="с-tv-show-card__cover">
                <Image
                    src={
                        props.tvShow.poster_path
                            ? imageUrl(IMG_SIZES.MEDIA_CARD_COVER, props.tvShow.poster_path)
                            : '/img/poster-not-available.jpg'
                    }
                    sizes="(max-width: 479px) 173px, (max-width: 767px) 213px, (max-width: 1023px) 230px, 295px"
                    alt={ props.tvShow.name }
                    fill
                />
            </div>

            <div className="с-tv-show-card__tags">
                <div className="с-tv-show-card__tag с-tv-show-card__tag--type">
                    { props.tvShow.media_type }
                </div>

                {
                    props.tvShow.adult &&
                    <div className="с-tv-show-card__tag с-tv-show-card__tag--adult">
                        18<span>+</span>
                    </div>
                }

                <div className="с-tv-show-card__tag с-tv-show-card__tag--average">
                    { Math.round(props.tvShow.vote_average ?? 0 * 10) }
                    <span>%</span>
                </div>
            </div>

            <div className="с-tv-show-card__footer">
                <p
                    className="с-tv-show-card__footer-title"
                    title={ props.tvShow.name }
                >
                    { props.tvShow.name }
                </p>
            </div>
        </Link>
    );
}
