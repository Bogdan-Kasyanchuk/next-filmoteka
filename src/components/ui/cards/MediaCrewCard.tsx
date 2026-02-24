'use client';

import Image from 'next/image';
import { useExtracted, useFormatter } from 'next-intl';

import { IMG_SIZES } from '@/datasets/constants';
import { PLACEHOLDERS } from '@/datasets/placeholders';
import { MediaType } from '@/enums';
import { imageUrl } from '@/helpers/externalUrls';
import { pagesMovieUrl, pagesTVShowUrl } from '@/routes';
import { Link } from '@/services/i18n/navigation';
import { MediaCrewMapper } from '@/types';

type Props = {
    crew: MediaCrewMapper
};

export default function MediaCrewCard(props: Props) {
    const format = useFormatter();

    const t = useExtracted();
        
    return (
        <Link
            href={
                props.crew.media_type === MediaType.MOVIE
                    ? pagesMovieUrl(props.crew.id)
                    : pagesTVShowUrl(props.crew.id)
            }
            className="c-media-compact-card"
        >
            <div className="c-media-compact-card__left">
                <div className="c-media-compact-card__date">
                    {

                        props.crew.release_date
                            ? format.dateTime(props.crew.release_date, { year: 'numeric' })
                            : '-'
                    }
                </div>

                <div className="c-media-compact-card__type">
                    { props.crew.media_type }
                </div>
            </div>

            <div className="c-media-compact-card__cover">
                <Image
                    src={
                        props.crew.poster_path
                            ? imageUrl(IMG_SIZES.MEDIA_CREW_COVER, props.crew.poster_path)
                            : '/img/poster-not-available.jpg'
                    }
                    sizes="45px"
                    alt={ props.crew.title }
                    placeholder={ PLACEHOLDERS[ '2x3' ] }
                    fill
                />
            </div>

            <div className="c-media-compact-card__info">
                <p
                    className="c-media-compact-card__info-name"
                    title={ props.crew.title }
                >
                    { props.crew.title }
                </p>

                {
                    props.crew.job &&
                    <p
                        className="c-media-compact-card__info-job"
                        title={ props.crew.job }
                    >
                        { t('as {job}', { job: props.crew.job }) }
                    </p>
                }
            </div>
        </Link>
    );
}
