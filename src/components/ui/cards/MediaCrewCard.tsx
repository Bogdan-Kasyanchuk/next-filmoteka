import Image from 'next/image';
import Link from 'next/link';

import { MediaType } from '@/enums';
import { IMG_SIZES } from '@/helpers/parameters';
import { imageUrl, pagesMovieUrl, pagesTVShowUrl } from '@/routes';
import { MediaCrewMapper } from '@/types';
import formatDate from '@/utils/formateDate';

type Props = {
    crew: MediaCrewMapper
};

export default function MediaCrewCard(props: Props) {
    return (
        <Link
            href={
                props.crew.media_type === MediaType.MOVIE
                    ? pagesMovieUrl(props.crew.id)
                    : pagesTVShowUrl(props.crew.id)
            }
            className="с-media-crew-card"
        >
            <div className="с-media-crew-card__left">
                <div className="с-media-crew-card__date">
                    {

                        props.crew.release_date
                            ? formatDate(props.crew.release_date, 'YYYY')
                            : '-'
                    }
                </div>

                <div className="с-media-crew-card__type">
                    { props.crew.media_type }
                </div>
            </div>

            <div className="с-media-crew-card__cover">
                <Image
                    src={
                        props.crew.poster_path
                            ? imageUrl(IMG_SIZES.MEDIA_CREW_CARD_COVER, props.crew.poster_path)
                            : '/img/poster-not-available.jpg'
                    }
                    sizes="45px"
                    alt={ props.crew.title }
                    fill
                />
            </div>

            <div className="с-media-crew-card__info">
                <p
                    className="с-media-crew-card__info-name"
                    title={ props.crew.title }
                >
                    { props.crew.title }
                </p>

                {
                    props.crew.job &&
                    <p
                        className="с-media-crew-card__info-job"
                        title={ props.crew.job }
                    >
                        as&nbsp;{ props.crew.job }
                    </p>
                }
            </div>
        </Link>
    );
}
