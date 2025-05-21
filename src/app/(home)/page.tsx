import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { MediaType, TimeType } from '@/enums';
import { getTrendings } from '@/services/api';

import Content from './_components/Content';
import Filters from './_components/Filters/Filters';
import TitleText from './_components/TitleText';

import './_styles/index.css';

type Props = {
    searchParams: Promise<{
        type?: 'all' | MediaType;
        time?: TimeType;
        page?: string;
    }>
};

export default async function Page(props: Props) {
    const searchParams = await props.searchParams;
    const type = searchParams.type || 'all';
    const time = searchParams.time || TimeType.DAY;
    const currentPage = Number(searchParams.page) || 1;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['trendings', type, time, currentPage],
        queryFn: () => getTrendings(type, time, currentPage),
    });

    return (
        <Container className='p-home'>
            <Filters
                type={type}
                time={time}
            />

            <Title
                center
                bold
                uppercase
            >
                <TitleText type={time} />
            </Title>

            <HydrationBoundary state={dehydrate(queryClient)}>
                <Content
                    type={type}
                    time={time}
                    currentPage={currentPage}
                />
            </HydrationBoundary>
        </Container>
    );
}