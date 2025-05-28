import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';

import { getTVShowById } from '@/services/api';

import Content from './_components/Content';

import './_styles/index.css';

type Props = {
    params: Promise<{ id: string }>
};

export default async function Page(props: Props) {
    const { id } = await props.params;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['tv-shows', id],
        queryFn: () => getTVShowById(id),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Content id={id} />
        </HydrationBoundary>
    );
}