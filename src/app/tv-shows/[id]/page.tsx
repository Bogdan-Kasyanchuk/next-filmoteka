import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';

import Container from '@/components/ui/layouts/Container';
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

    const dehydratedState = dehydrate(queryClient);

    return (
        <Container className='p-tv-show'>
            <HydrationBoundary state={dehydratedState}>
                <Content id={id} />
            </HydrationBoundary>
        </Container>
    );
}