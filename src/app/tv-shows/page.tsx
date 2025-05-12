import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { TVShowType } from '@/enums';
import { getTVShows } from '@/services/api';

import Content from './_components/Content';
import Filters from './_components/Filters';

import './_styles/index.css';

type Props = {
    searchParams: Promise<{
        type?: TVShowType;
        page?: string;
    }>
};

export default async function Page(props: Props) {
    const searchParams = await props.searchParams;
    const type = searchParams.type || TVShowType.AIRING_TODAY;
    const currentPage = Number(searchParams.page) || 1;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['tv-shows', type, currentPage],
        queryFn: () => getTVShows(type, currentPage),
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <Container className='p-tv-shows'>
            <Filters type={type} />

            <Title
                center
                bold
                uppercase
            >
                {
                    type === TVShowType.AIRING_TODAY
                        ? 'TV Shows airing today'
                        : type === TVShowType.ON_THE_AIR
                            ? 'TV Shows that air in the next 7 days.'
                            : type === TVShowType.POPULAR
                                ? 'Popular TV Shows'
                                : 'TV Shows with a top rating'
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