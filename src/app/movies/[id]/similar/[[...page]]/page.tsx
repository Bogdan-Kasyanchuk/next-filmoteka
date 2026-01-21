import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import { getSimilarMovies } from '@/services/api';
import { getCurrentMovieByIdCached } from '@/services/movies';

import Content from './components/Content';

import './styles/index.css';

type Props = {
    params: Promise<{
        id: string,
        page?: string[]
    }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
        
    const data = await getCurrentMovieByIdCached(params.id);

    const title = data?.title || data?.original_title || 'Movie';

    return {
        title: `${ title } | Similar`
    };
}

export default async function Page(props: Props) {
    const params = await props.params;
    
    const page = params.page ? Number(params.page[ 1 ]) : 1;

    const queryClient = new QueryClient();

    await Promise.all([
        queryClient.prefetchQuery(
            {
                queryKey: [ 'movies', 'current', params.id ],
                queryFn: () => getCurrentMovieByIdCached(params.id)
            }
        ),
        queryClient.prefetchQuery(
            {
                queryKey: [ 'movies', params.id, 'similar', page ],
                queryFn: () => getSimilarMovies(params.id, page)
            }
        )
    ]);

    return (
        <HydrationBoundary state={ dehydrate(queryClient) }>
            <Content
                id={ params.id }
                page={ page }
            />
        </HydrationBoundary>
    );
}