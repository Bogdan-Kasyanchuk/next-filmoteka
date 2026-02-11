'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import VideoCard from '@/components/ui/cards/VideoCard';
import { MediaType, VideoSiteType, VideoType } from '@/enums';
import { transformVideo } from '@/helpers/transformData';
import { getVideos } from '@/services/tmdbApi/general';
import { VideoMapper } from '@/types';

import Wrapper from './Wrapper';

type Props = {
    type: MediaType.MOVIE | MediaType.TV_SHOW,
    id: string
};

export default function Videos(props: Props) {
    const { data, isError } = useSuspenseQuery({
        queryKey: [ 'videos', props.type, props.id ],
        queryFn: () => getVideos(props.type, props.id),
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
        <Wrapper>
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
        </Wrapper>
    );
}
