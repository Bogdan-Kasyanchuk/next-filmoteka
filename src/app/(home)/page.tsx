import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { TimeType } from '@/enums';
import { getTrendings } from '@/services/api';

import Content from './_components/Content';
import Filters from './_components/Filters/Filters';

import './_styles/index.css';

type Props = {
    searchParams: Promise<{ page?: string; }>
};

export default async function Page(props: Props) {
    const searchParams = await props.searchParams;
    const currentPage = Number(searchParams.page) || 1;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['trendings', currentPage],
        queryFn: () => getTrendings('all', TimeType.DAY, currentPage),
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <Container className='p-home'>
            <Filters />

            <Title
                center
                bold
                uppercase
            >
                Trends of the day
            </Title>

            <HydrationBoundary state={dehydratedState}>
                <Content />
            </HydrationBoundary>
        </Container>
    );
}