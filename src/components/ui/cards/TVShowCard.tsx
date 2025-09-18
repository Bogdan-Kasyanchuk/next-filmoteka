import Image from 'next/image';
import Link from 'next/link';

import { PARAMETERS, IMG_SIZES } from '@/helpers/parameters';
import { pagesTVUrl } from '@/routes';
import { TVShowMapper } from '@/types';

type Props = {
    tvShow: TVShowMapper,
}

export default function TVShowCard(props: Props) {
    return (
        <Link
            href={`${pagesTVUrl()}/${props.tvShow.id}`}
            className='с-tv-show-card'
        >
            <div className='с-tv-show-card__cover'>
                <Image
                    src={
                        props.tvShow.poster_path
                            ? `${PARAMETERS.URL_IMG}${IMG_SIZES.MEDIA_CARD_COVER}${props.tvShow.poster_path}`
                            : '/img/poster-not-available.jpg'
                    }
                    sizes="(max-width: 479px) 173px, (max-width: 767px) 213px, (max-width: 1023px) 230px, 241px"
                    alt={props.tvShow.name}
                    fill
                />
            </div>

            <div className='с-tv-show-card__tags'>
                <div className='с-tv-show-card__tag с-tv-show-card__tag--type'>
                    {props.tvShow.media_type}
                </div>

                {
                    props.tvShow.adult &&
                    <div className='с-tv-show-card__tag с-tv-show-card__tag--adult'>
                        18<span>+</span>
                    </div>
                }

                <div className='с-tv-show-card__tag с-tv-show-card__tag--average'>
                    {Math.round(props.tvShow.vote_average * 10)}
                    <span>%</span>
                </div>
            </div>

            <div className='с-tv-show-card__footer'>
                <p
                    className='с-tv-show-card__footer-title'
                    title={props.tvShow.name}
                >
                    {props.tvShow.name}
                </p>
            </div>
        </Link>
    );
};
