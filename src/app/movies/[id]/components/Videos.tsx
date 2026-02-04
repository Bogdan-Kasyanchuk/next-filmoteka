'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import VideoCard from '@/components/ui/cards/VideoCard';
import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { VideoSiteType, VideoType } from '@/enums';
import { transformVideo } from '@/helpers/transformData';
import { getMoviesVideos } from '@/services/tmdbApi/movies';
import { VideoMapper } from '@/types';

type Props = {
    id: string
};

export default function Videos(props: Props) {
    const { data, isError } = useSuspenseQuery({
        queryKey: [ 'movies', props.id, 'videos' ],
        queryFn: () => getMoviesVideos(props.id),
        select: data => {
            if (!data.results.length) {
                return null;  
            }

            return data.results.filter(
                video => {
                    const isYoutubeVideo = video.site === VideoSiteType.YOUTUBE && (video.type === VideoType.TRAILER || video.type === VideoType.CLIP);

                    if (isYoutubeVideo) {
                        return transformVideo(video);
                    }
                }
            ) as VideoMapper[];
        }
    });

    if (isError || !data) {
        return null;
    }
    
    return (
        <Container className="xxl:max-w-[1440px]">
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
                        data.map(
                            (video, index) => (
                                <li key={ index }>
                                    <VideoCard video={ video } />
                                </li>
                            )
                        )
                    }
                </ul>
            </div>
        </Container>
    );
}
