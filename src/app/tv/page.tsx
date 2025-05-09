import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { TVType } from '@/enums';
import { getTVs } from '@/services/api';

import Content from './_components/Content';
import Filters from './_components/Filters/Filters';

import './_styles/index.css';

type Props = {
    searchParams: Promise<{
        type?: TVType;
        page?: string;
    }>
};

export default async function Movie(props: Props) {
    const searchParams = await props.searchParams;
    const type = searchParams.type || TVType.AIRING_TODAY;
    const currentPage = Number(searchParams.page) || 1;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['tvs', type, currentPage],
        queryFn: () => getTVs(type, currentPage),
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <Container className='p-tvs'>
            <Filters type={type} />

            <Title
                center
                bold
                uppercase
            >
                {
                    type === TVType.AIRING_TODAY
                        ? 'TV shows airing today'
                        : type === TVType.ON_THE_AIR
                            ? 'TV shows that air in the next 7 days.'
                            : type === TVType.POPULAR
                                ? 'Popular TV shows'
                                : 'TV shows with a top rating'
                }
            </Title>

            <HydrationBoundary state={dehydratedState}>
                <Content
                    type={type}
                    currentPage={currentPage}
                />
            </HydrationBoundary>
        </Container>
    );
}