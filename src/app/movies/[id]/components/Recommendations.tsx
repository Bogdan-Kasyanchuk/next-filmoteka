'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import RecommendationsComponent from '@/components/app/Recommendations';
import MovieCard from '@/components/ui/cards/MovieCard';
import { MediaType } from '@/enums';
import { transformMovie } from '@/helpers/transformData';
import { getRecommendations } from '@/services/tmdbApi/general';
import { MovieShema } from '@/shemas';

type Props = {
    id: string
};

export default function Recommendatio1ns(props: Props) {
    const {
        data,
        isError,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
    } = useSuspenseInfiniteQuery({
        queryKey: [ 'recommendations', MediaType.MOVIE, props.id ],
        queryFn: ({ pageParam }) => getRecommendations<MovieShema>(
            MediaType.MOVIE, props.id, pageParam
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

            return data.pages.flatMap(page => page.results.map(transformMovie));
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
                item => <MovieCard movie={ item } />
            }
        </RecommendationsComponent>
    );
}