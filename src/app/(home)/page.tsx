import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { MediaType, TimeType } from '@/enums';
import { getTrendings } from '@/services/api';

import Content from './_components/Content';
import Filter from './_components/Filter';
import TitleText from './_components/TitleText';

import './_styles/index.css';

export const metadata: Metadata = {
    title: 'Home'
};

type Props = {
    searchParams: Promise<{
        type?: 'all' | MediaType,
        time?: TimeType,
        page?: string
    }>
};

export default async function Page(props: Props) {
    const searchParams = await props.searchParams;
    const type = searchParams.type || 'all';
    const time = searchParams.time || TimeType.DAY;
    const currentPage = Number(searchParams.page) || 1;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [ 'trendings', type, time, currentPage ],
        queryFn: () => getTrendings(type, time, currentPage)
    });

    return (
        <Container className="p-home">
            <Filter
                type={ type }
                time={ time }
            />

            <Title className="p-home__title">
                <TitleText type={ time } />
            </Title>

            <HydrationBoundary state={ dehydrate(queryClient) }>
                <Content
                    type={ type }
                    time={ time }
                    currentPage={ currentPage }
                />
            </HydrationBoundary>
        </Container>
    );
}