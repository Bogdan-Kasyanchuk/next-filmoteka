import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import { getTVShowById } from '@/services/api';
import { TVShowDetailsShema } from '@/shemas';

import Content from './_components/Content';

import './_styles/index.css';

type Props = {
    params: Promise<{ id: string }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
        
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [ 'tv-shows', params.id ],
        queryFn: () => getTVShowById(params.id)
    });

    const data = queryClient.getQueryData<TVShowDetailsShema>([ 'tv-shows', params.id ]);

    return {
        title: data?.name || data?.original_name || 'TV'
    };
}

export default async function Page(props: Props) {
    const params = await props.params;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [ 'tv-shows', params.id ],
        queryFn: () => getTVShowById(params.id)
    });

    return (
        <HydrationBoundary state={ dehydrate(queryClient) }>
            <Content id={ params.id } />
        </HydrationBoundary>
    );
}