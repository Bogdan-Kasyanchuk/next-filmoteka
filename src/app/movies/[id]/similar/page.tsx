import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import { getCurrentMovieById, getSimilarMovies } from '@/services/api';
import { CurrentMovieShema } from '@/shemas';

import Content from './_components/Content';

import './_styles/index.css';

type Props = {
    params: Promise<{ id: string }>,
    searchParams: Promise<{ page?: string }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
        
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [ 'movies', 'current', params.id ],
        queryFn: () => getCurrentMovieById(params.id)
    });

    const data = queryClient.getQueryData<CurrentMovieShema>([ 'movies', 'current', params.id ]);

    const title = data?.title || data?.original_title || 'Movie';

    return {
        title: `${ title } | Similar Movies`
    };
}

export default async function Page(props: Props) {
    const params = await props.params;

    const searchParams = await props.searchParams;
    const currentPage = Number(searchParams.page ?? 1);

    const queryClient = new QueryClient();

    await Promise.all([
        queryClient.prefetchQuery(
            {
                queryKey: [ 'movies', 'current', params.id ],
                queryFn: () => getCurrentMovieById(params.id)
            }
        ),
        queryClient.prefetchQuery(
            {
                queryKey: [ 'movies', params.id, 'similar', currentPage ],
                queryFn: () => getSimilarMovies(params.id, currentPage)
            }
        )
    ]);

    return (
        <HydrationBoundary state={ dehydrate(queryClient) }>
            <Content
                id={ params.id }
                currentPage={ currentPage }
            />
        </HydrationBoundary>
    );
}