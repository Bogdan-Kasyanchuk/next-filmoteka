'use client';

import { useExtracted } from 'next-intl';

import ImageCard from '@/components/ui/cards/ImageCard';
import Title from '@/components/ui/typography/Title';
import { ImageMapper } from '@/types';

type Props = {
    images: ImageMapper[],
    name: string
};

export default function Gallery(props: Props) {
    const t = useExtracted();
        
    return (
        <div className="p-person__gallery">
            <Title
                order="h3"
                variant={ 3 }
                className="p-person__gallery-title"
            >
                { t('Photo gallery') }
            </Title>

            <ul className="p-person__gallery-list">
                {
                    props.images.map(
                        (image, index) => (
                            <li key={ index }>
                                <ImageCard
                                    image={ image }
                                    alt={ props.name }
                                />
                            </li>
                        )
                    )
                }
            </ul>
        </div>
    );
}