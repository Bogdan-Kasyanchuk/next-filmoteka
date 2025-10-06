import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import { getCurrentMovieById, getRecommendationsMovies } from '@/services/api';

import Content from './_components/Content';

import './_styles/index.css';

type Props = {
    params: Promise<{ id: string }>,
    searchParams: Promise<{ page?: string }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { id } = await props.params;

    return {
        title: `${ id }: recommendations`
    };
}

export default async function Page(props: Props) {
    const { id } = await props.params;
    const searchParams = await props.searchParams;
    const currentPage = Number(searchParams.page) || 1;

    const queryClient = new QueryClient();

    await Promise.all([
        await queryClient.prefetchQuery(
            {
                queryKey: [ 'movies', id, 'recommendations' ],
                queryFn: () => getCurrentMovieById(id)
            }
        ),
        await queryClient.prefetchQuery(
            {
                queryKey: [ 'movies', id, 'recommendations', currentPage ],
                queryFn: () => getRecommendationsMovies(id, currentPage)
            }
        )
    ]);

    return (
        <HydrationBoundary state={ dehydrate(queryClient) }>
            <Content
                id={ id }
                currentPage={ currentPage }
            />
        </HydrationBoundary>
    );
}