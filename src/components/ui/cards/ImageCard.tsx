'use client';

import Image from 'next/image';
import { useExtracted } from 'next-intl';

import { IMG_SIZES } from '@/datasets/constants';
import { PLACEHOLDERS } from '@/datasets/placeholders';
import { imageUrl } from '@/routes';
import { ImageMapper } from '@/types';

type Props = {
    image: ImageMapper,
    alt: string
};

export default function ImageCard(props: Props) {
    const t = useExtracted();
        
    return (
        <div className="c-image-card">
            <div className="c-image-card__cover">
                <Image
                    src={
                        props.image.file_path
                            ? imageUrl(IMG_SIZES.PERSON_IMAGE, props.image.file_path)
                            : '/img/avatar-placeholder.svg'
                    }
                    sizes="174px"
                    alt={ props.alt }
                    placeholder={ PLACEHOLDERS[ '2x3' ] }
                    fill
                />
            </div>

            <dl className="c-image-card__info-list">
                <div className="c-image-card__info-item">
                    <dt>{ t('Rating:') }</dt>
                    <dd>{ Math.round(props.image.vote_average ?? 0 * 10) }</dd>
                </div>

                <div className="c-image-card__info-item">
                    <dt>{ t('Votes:') }</dt>
                    <dd>{ props.image.vote_count ?? 0 }</dd>
                </div>
            </dl>
        </div>
    );
}