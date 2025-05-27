import Image from 'next/image';
import Link from 'next/link';

import { PARAMETERS, IMG_SIZES } from '@/helpers/parameters';
import { TVShowMapper } from '@/types';

type Props = {
    tvShow: TVShowMapper
}

export default function TVShowCard(props: Props) {
    return (
        <Link
            href={`/tv-shows/${props.tvShow.id}`}
            className='с-tv-show-card'
        >
            <div className='с-tv-show-card__cover'>
                <Image
                    src={
                        props.tvShow.poster_path
                            ? `${PARAMETERS.URL_IMG}/${IMG_SIZES.MEDIA_CARD_COVER}/${props.tvShow.poster_path}`
                            : '/img/poster-not-available.jpg'
                    }
                    sizes="(max-width: 479px) 173px, (max-width: 767px) 213px, (max-width: 1023px) 230px, 294px"
                    alt={props.tvShow.name}
                    fill
                />
            </div>

            <div className='с-tv-show-card__tag'>
                {props.tvShow.media_type}
            </div>

            <div className='с-tv-show-card__average'>
                {(props.tvShow.vote_average / 10 * 100).toFixed(0)}%
            </div>

            <div className='с-tv-show-card__footer'>
                <p className='с-tv-show-card__footer-title'>
                    {props.tvShow.name}
                </p>
            </div>
        </Link>
    );
};
