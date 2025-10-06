import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import { getMovieById } from '@/services/api';

import Content from './_components/Content';

import './_styles/index.css';

type Props = {
    params: Promise<{ id: string }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { id } = await props.params;

    return {
        title: id
    };
}

export default async function Page(props: Props) {
    const { id } = await props.params;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [ 'movies', id ],
        queryFn: () => getMovieById(id)
    });

    return (
        <HydrationBoundary state={ dehydrate(queryClient) }>
            <Content id={ id } />
        </HydrationBoundary>
    );
}