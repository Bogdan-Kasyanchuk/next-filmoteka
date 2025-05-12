import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';

import Container from '@/components/ui/layouts/Container';
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

    const dehydratedState = dehydrate(queryClient);

    return (
        <Container className='p-movie'>
            <HydrationBoundary state={dehydratedState}>
                <Content id={id} />
            </HydrationBoundary>
        </Container>
    );
}