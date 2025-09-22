import ImageCard from '@/components/ui/cards/ImageCard';
import Title from '@/components/ui/typography/Title';
import { ImageMapper } from '@/types';

type Props = {
    images: ImageMapper[],
    name: string
}

export default function Images(props: Props) {
    return (
        <div className='p-person__images'>
            <Title
                order='h3'
                variant={3}
                className='p-person__images-title'
            >
                Images
            </Title>

            <ul className='p-person__images-list'>
                {
                    props.images.map(
                        (image, index) => (
                            <li key={index}>
                                <ImageCard
                                    image={image}
                                    alt={props.name}
                                />
                            </li>
                        )
                    )
                }
            </ul>
        </div>
    );
}