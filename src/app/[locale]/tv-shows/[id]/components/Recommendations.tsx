'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';

import RecommendationsComponent from '@/components/app/Recommendations';
import TVShowCard from '@/components/ui/cards/TVShowCard';
import { MediaType } from '@/enums';
import { generalQueryKeys } from '@/helpers/queryKeys';
import { transformTVShow } from '@/helpers/transformData';
import { getRecommendations } from '@/services/tmdb/general';
import { TVShowShema } from '@/shemas';

type Props = {
    id: string
};

export default function Recommendations(props: Props) {
    const locale = useLocale();
        
    const {
        data,
        isError,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
    } = useSuspenseInfiniteQuery({
        queryKey: generalQueryKeys.recommendations(MediaType.TV_SHOW, props.id, locale),
        queryFn: ({ pageParam }) => getRecommendations<TVShowShema>(
            MediaType.TV_SHOW,
            props.id,
            pageParam,
            locale
        ),
        initialPageParam: 1,
        getNextPageParam: lastPage => {
            const nextPage = lastPage.page + 1;

            return nextPage <= lastPage.total_pages
                ? nextPage
                : undefined;
        },
        select: data => {
            if (!data.pages[ 0 ].results.length) {
                return null;  
            }

            return data.pages.flatMap(page => page.results.map(transformTVShow));
        }
    });

    if (isError || !data) {
        return null;
    }

    return (
        <RecommendationsComponent
            items={ data }
            hasNextPage={ hasNextPage }
            isFetchingNextPage={ isFetchingNextPage }
            fetchNextPage={
                () => {
                    fetchNextPage();
                } 
            }
        > 
            {
                item => <TVShowCard tvShow={ item } />
            }
        </RecommendationsComponent>
    );
}