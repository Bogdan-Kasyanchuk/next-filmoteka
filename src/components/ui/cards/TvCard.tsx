import Image from 'next/image';
import Link from 'next/link';

import { TVMapper } from '@/types';

type Props = {
    tv: TVMapper
}

export default function TVCard(props: Props) {
    const normalizedTitle = props.tv.name || props.tv.original_name;

    return (
        <Link
            href={`/tv/${props.tv.id}`}
            className='с-tv-card'
        >
            <div className='с-tv-card__cover'>
                <Image
                    fill
                    src={
                        props.tv.poster_path
                            ? `${process.env.NEXT_PUBLIC_BASE_URL_IMG}${props.tv.poster_path}`
                            : '/img/poster-not-available.jpg'
                    }
                    alt={normalizedTitle}
                />
            </div>

            <div className='с-tv-card__tag'>
                {props.tv.media_type}
            </div>

            <div className='с-tv-card__footer'>
                <p className='с-tv-card__footer-title'>
                    {normalizedTitle}
                </p>
                <p className='с-tv-card__footer-average'>
                    {props.tv.vote_average}
                </p>
            </div>
        </Link>
    );
};
