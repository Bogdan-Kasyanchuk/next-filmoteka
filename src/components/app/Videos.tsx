import { useExtracted } from 'next-intl';

import VideoCard from '@/components/ui/cards/VideoCard';
import Title from '@/components/ui/typography/Title';
import { VideoMapper } from '@/types';

type Props = {
    videos: VideoMapper[]
};

export default function Videos(props: Props) {
    const t = useExtracted();

    return (
        <div>
            <Title
                order="h3"
                variant={ 3 }
                className="c-videos__title"
            >
                { t('Videos') }
            </Title>
            
            <ul className="c-videos__list">
                {
                    props.videos.map(
                        (video, index) => (
                            <li key={ index }>
                                <VideoCard video={ video } />
                            </li>
                        )
                    )
                }
            </ul>
        </div>
    );
}
