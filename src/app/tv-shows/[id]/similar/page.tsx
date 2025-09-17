import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';

import { getCurrentTVShowById, getSimilarTVShow } from '@/services/api';

import Content from './_components/Content';

import './_styles/index.css';

type Props = {
    params: Promise<{ id: string }>,
    searchParams: Promise<{ page?: string }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { id } = await props.params;

    return {
        title: `${id}: similar`
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
                queryKey: ['tv-shows', id, 'similar'],
                queryFn: () => getCurrentTVShowById(id),
            },
        ),
        await queryClient.prefetchQuery(
            {
                queryKey: ['tv-shows', id, 'similar', currentPage],
                queryFn: () => getSimilarTVShow(id, currentPage),
            },
        )
    ]);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Content
                id={id}
                currentPage={currentPage}
            />
        </HydrationBoundary>
    );
}