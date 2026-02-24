'use client';

import Image from 'next/image';
import { useExtracted, useFormatter } from 'next-intl';

import { IMG_SIZES } from '@/datasets/constants';
import { PLACEHOLDERS } from '@/datasets/placeholders';
import { MediaType } from '@/enums';
import { imageUrl } from '@/helpers/externalUrls';
import { pagesMovieUrl, pagesTVShowUrl } from '@/routes';
import { Link } from '@/services/i18n/navigation';
import { MediaCastMapper } from '@/types';

type Props = {
    cast: MediaCastMapper
};

export default function MediaCastCard(props: Props) {
    const format = useFormatter();

    const t = useExtracted();
        
    return (
        <Link
            href={
                props.cast.media_type === MediaType.MOVIE
                    ? pagesMovieUrl(props.cast.id)
                    : pagesTVShowUrl(props.cast.id)
            }
            className="c-media-compact-card"
        >
            <div className="c-media-compact-card__left">
                <div className="c-media-compact-card__date">
                    {

                        props.cast.release_date
                            ? format.dateTime(props.cast.release_date, { year: 'numeric' })
                            : '-'
                    }
                </div>

                <div className="c-media-compact-card__type">
                    { props.cast.media_type }
                </div>
            </div>

            <div className="c-media-compact-card__cover">
                <Image
                    src={
                        props.cast.poster_path
                            ? imageUrl(IMG_SIZES.MEDIA_CAST_COVER, props.cast.poster_path)
                            : '/img/poster-not-available.jpg'
                    }
                    sizes="45px"
                    alt={ props.cast.title }
                    placeholder={ PLACEHOLDERS[ '2x3' ] }
                    fill
                />
            </div>

            <div className="c-media-compact-card__info">
                <p
                    className="c-media-compact-card__info-name"
                    title={ props.cast.title }
                >
                    { props.cast.title }
                </p>

                {
                    props.cast.character &&
                    <p
                        className="c-media-compact-card__info-character"
                        title={ props.cast.character }
                    >
                        { t('as {character}', { character: props.cast.character }) }
                    </p>
                }
            </div>
        </Link>
    );
}
