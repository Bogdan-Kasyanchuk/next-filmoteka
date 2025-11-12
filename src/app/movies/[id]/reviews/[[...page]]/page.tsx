import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import { getCurrentMovieById, getReviewsToMovie } from '@/services/api';
import { CurrentMovieShema } from '@/shemas';

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
        
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [ 'movies', 'current', params.id ],
        queryFn: () => getCurrentMovieById(params.id)
    });

    const data = queryClient.getQueryData<CurrentMovieShema>([ 'movies', 'current', params.id ]);

    const title = data?.title || data?.original_title || 'Movie';

    return {
        title: `${ title } | Reviews`
    };
}

export default async function Page(props: Props) {
    const params = await props.params;
    
    const page = params.page ? Number(params.page[ 1 ]) : 1;

    const queryClient = new QueryClient();

    await Promise.all([
        await queryClient.prefetchQuery(
            {
                queryKey: [ 'movies', 'current', params.id ],
                queryFn: () => getCurrentMovieById(params.id)
            }
        ),
        await queryClient.prefetchQuery(
            {
                queryKey: [ 'movies', params.id, 'reviews', page ],
                queryFn: () => getReviewsToMovie(params.id, page)
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