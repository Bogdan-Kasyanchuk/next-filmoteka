import Image from 'next/image';
import Link from 'next/link';

import { MediaType } from '@/enums';
import { PARAMETERS, IMG_SIZES } from '@/helpers/parameters';
import { MediaCastMapper } from '@/types';
import { formatDate } from '@/utils/formateDate';

type Props = {
    cast: MediaCastMapper
}

export default function MediaCastCard(props: Props) {
    return (
        <Link
            href={`/${props.cast.media_type === MediaType.MOVIE ? 'movies' : 'tv-shows'}/${props.cast.id}`}
            className='с-media-cast-card'
        >
            <div className='с-media-cast-card__left'>
                <div className='с-media-cast-card__date'>
                    {

                        props.cast.release_date
                            ? formatDate(props.cast.release_date, 'YYYY')
                            : '-'
                    }
                </div>

                <div className='с-media-cast-card__type'>
                    {props.cast.media_type}
                </div>
            </div>

            <div className='с-media-cast-card__cover'>
                <Image
                    src={
                        props.cast.poster_path
                            ? `${PARAMETERS.URL_IMG}/${IMG_SIZES.MEDIA_CAST_CARD_COVER}${props.cast.poster_path}`
                            : '/img/poster-not-available.jpg'
                    }
                    sizes='92px'
                    alt={props.cast.title}
                    fill
                />
            </div>

            <div className='с-media-cast-card__info'>
                <p
                    className='с-media-cast-card__info-name'
                    title={props.cast.title}
                >
                    {props.cast.title}
                </p>

                {
                    props.cast.character &&
                    <p
                        className='с-media-cast-card__info-character'
                        title={props.cast.character}
                    >
                        as&nbsp;{props.cast.character}
                    </p>
                }
            </div>
        </Link >
    );
};
