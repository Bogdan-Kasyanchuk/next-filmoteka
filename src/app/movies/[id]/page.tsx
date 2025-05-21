import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';

import { getMovieById } from '@/services/api';

import Content from './_components/Content';

import './_styles/index.css';

type Props = {
    params: Promise<{ id: string }>
};

export default async function Page(props: Props) {
    const { id } = await props.params;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['movies', id],
        queryFn: () => getMovieById(id),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className='p-movie'>
                <Content id={id} />
            </div>
        </HydrationBoundary>
    );
}