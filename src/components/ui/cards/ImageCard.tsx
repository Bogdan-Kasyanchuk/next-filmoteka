import Image from 'next/image';

import { IMG_SIZES } from '@/helpers/parameters';
import { imageUrl } from '@/routes';
import { ImageMapper } from '@/types';

type Props = {
    image: ImageMapper,
    alt: string
};

export default function ImageCard(props: Props) {
    return (
        <div className="c-image-card">
            <div className="c-image-card__cover">
                <Image
                    src={
                        props.image.file_path
                            ? imageUrl(IMG_SIZES.PERSON_IMAGE, props.image.file_path)
                            : '/img/avatar-placeholder.svg'
                    }
                    sizes="166px"
                    alt={ props.alt }
                    fill
                />
            </div>

            <dl className="c-image-card__info-list">
                <div className="c-image-card__info-item">
                    <dt>Rating:</dt>
                    <dd>{ Math.round(props.image.vote_average ?? 0 * 10) }</dd>
                </div>

                <div className="c-image-card__info-item">
                    <dt>Votes:</dt>
                    <dd>{ props.image.vote_count ?? 0 }</dd>
                </div>
            </dl>
        </div>
    );
}