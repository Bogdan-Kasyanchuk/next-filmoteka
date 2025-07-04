import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';

import { getTVShowSeasonByNumber } from '@/services/api';

import Content from './_components/Content';

import './_styles/index.css';

type Props = {
    params: Promise<{
        id: string
        season: string
    }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { id, season } = await props.params;

    return {
        title: `${id}: ${season}`
    };
}

export default async function Page(props: Props) {
    const { id, season } = await props.params;

    const normalizedSeasonId = season.split('-').at(-1) ?? '0';

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['tv-shows', id, normalizedSeasonId],
        queryFn: () => getTVShowSeasonByNumber(id, normalizedSeasonId),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Content
                id={id}
                season={normalizedSeasonId}
            />
        </HydrationBoundary>
    );
}