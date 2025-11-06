import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import { getTVShowById, getTVShowSeasonByNumber } from '@/services/api';
import { TVShowDetailsShema } from '@/shemas';

import Content from './_components/Content';

import './_styles/index.css';

type Props = {
    params: Promise<{
        id: string,
        season: string
    }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;

    const queryClient = new QueryClient();
    
    await queryClient.prefetchQuery({
        queryKey: [ 'tv-shows', params.id ],
        queryFn: () => getTVShowById(params.id)
    });
    
    const data = queryClient.getQueryData<TVShowDetailsShema>([ 'tv-shows', params.id ]);

    const name = data?.name || data?.original_name || 'TV Show';

    return {
        title: `${ name } | ${ params.season }`
    };
}

export default async function Page(props: Props) {
    const params = await props.params;

    const normalizedSeasonId = params.season.split('-').at(-1) ?? '0';

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [ 'tv-shows', params.id, normalizedSeasonId ],
        queryFn: () => getTVShowSeasonByNumber(params.id, normalizedSeasonId)
    });

    return (
        <HydrationBoundary state={ dehydrate(queryClient) }>
            <Content
                id={ params.id }
                season={ normalizedSeasonId }
            />
        </HydrationBoundary>
    );
}