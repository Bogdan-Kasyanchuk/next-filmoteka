import VideoCard from '@/components/ui/cards/VideoCard';
import Title from '@/components/ui/typography/Title';
import { VideoMapper } from '@/types';

type Props = {
    videos: VideoMapper[]
};

export default function Videos(props: Props) {
    return (
        <div className="с-videos">
            <Title
                order="h3"
                variant={ 3 }
                className="с-videos__title"
            >
                Videos
            </Title>

            <ul className="с-videos__list">
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