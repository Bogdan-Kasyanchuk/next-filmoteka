'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';

import VideoCard from '@/components/ui/cards/VideoCard';
import { MediaType, VideoSiteType, VideoType } from '@/enums';
import { generalQueryKeys } from '@/helpers/queryKeys';
import { transformVideo } from '@/helpers/transformData';
import { getVideos } from '@/services/tmdb/general';
import { VideoMapper } from '@/types';

import Wrapper from './Wrapper';

type Props = {
    type: MediaType.MOVIE | MediaType.TV_SHOW,
    id: string
};

export default function Videos(props: Props) {
    const locale = useLocale();
    
    const { data, isError } = useSuspenseQuery({
        queryKey: generalQueryKeys.videos(props.type, props.id, locale),
        queryFn: () => getVideos(props.type, props.id, locale),
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
            <ul className="c-videos__list">
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
