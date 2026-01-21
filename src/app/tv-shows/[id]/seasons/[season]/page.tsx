import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import { getTVShowSeasonByNumber } from '@/services/api';
import { getTVShowByIdCached } from '@/services/tv-shows';

import Content from './components/Content';

import './styles/index.css';

type Props = {
    params: Promise<{
        id: string,
        season: string
    }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;

    const data = await getTVShowByIdCached(params.id);

    const name = data?.name || data?.original_name || 'TV Show';

    return {
        title: `${ name } | Season ${ params.season }`
    };
}

export default async function Page(props: Props) {
    const params = await props.params;

    const season = Number(params.season);

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [ 'tv-shows', params.id, season ],
        queryFn: () => getTVShowSeasonByNumber(params.id, season)
    });

    return (
        <HydrationBoundary state={ dehydrate(queryClient) }>
            <Content
                id={ params.id }
                season={ season }
            />
        </HydrationBoundary>
    );
}