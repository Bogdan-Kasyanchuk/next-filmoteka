import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import { getReviewsToTVShow } from '@/services/api';
import { getCurrentTVShowByIdCached } from '@/services/cachedWrappers';

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
        
    const data = await getCurrentTVShowByIdCached(params.id);

    const title = data?.name || data?.original_name || 'TV Show';

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
                queryKey: [ 'tv-shows', params.id, 'reviews' ],
                queryFn: () => getCurrentTVShowByIdCached(params.id)
            }
        ),
        await queryClient.prefetchQuery(
            {
                queryKey: [ 'tv-shows', params.id, 'reviews', page ],
                queryFn: () => getReviewsToTVShow(params.id, page)
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