'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import MovieCard from '@/components/ui/cards/MovieCard';
import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { transformMovie } from '@/helpers/transformData';
import { getRecommendationsMovies } from '@/services/tmdbApi/movies';

type Props = {
    id: string
};

export default function Recommendations(props: Props) {
    const {
        data,
        isError,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
    } = useSuspenseInfiniteQuery({
        queryKey: [ 'movies', props.id, 'recommendations' ],
        queryFn: ({ pageParam }) => getRecommendationsMovies(props.id, pageParam),
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
        <Container className="xxl:max-w-[1440px]">
            <div className="с-recommendations">
                <Title
                    order="h3"
                    variant={ 3 }
                    className="с-recommendations__title"
                >
                Recommendations
                </Title>

                <ul className="с-recommendations__list">
                    {
                        data.map(
                            item => (
                                <li key={ item.id }>
                                    <MovieCard movie={ item } />
                                </li>
                            )
                        )
                    }
                </ul>

                {
                    hasNextPage &&
                    <button
                        type="button"
                        className="с-recommendations__show-all-button"
                        disabled = { isFetchingNextPage }
                        onClick={
                            () => {
                                fetchNextPage();
                            } 
                        }
                    >
                        { isFetchingNextPage ? 'Loading...' : 'Load more' }
                    </button>
                }
            </div>
        </Container>
    );
}