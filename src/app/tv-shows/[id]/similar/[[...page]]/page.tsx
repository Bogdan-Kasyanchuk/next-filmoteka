import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import { getCurrentTVShowById, getSimilarTVShow } from '@/services/api';
import { CurrentTVShowShema } from '@/shemas';

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
        queryKey: [ 'tv-shows', 'current', params.id ],
        queryFn: () => getCurrentTVShowById(params.id)
    });

    const data = queryClient.getQueryData<CurrentTVShowShema>([ 'tv-shows', 'current', params.id ]);

    const title = data?.name || data?.original_name || 'TV Show';

    return {
        title: `${ title } | Similar`
    };
}

export default async function Page(props: Props) {
    const params = await props.params;

    const page = params.page ? Number(params.page[ 1 ]) : 1;

    const queryClient = new QueryClient();

    await Promise.all([
        await queryClient.prefetchQuery(
            {
                queryKey: [ 'tv-shows', 'current', params.id ],
                queryFn: () => getCurrentTVShowById(params.id)
            }
        ),
        await queryClient.prefetchQuery(
            {
                queryKey: [ 'tv-shows', params.id, 'similar', page ],
                queryFn: () => getSimilarTVShow(params.id, page)
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