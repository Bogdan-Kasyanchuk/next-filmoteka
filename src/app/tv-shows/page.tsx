import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { TVShowType } from '@/enums';
import { getTVShows } from '@/services/api';

import Content from './_components/Content';
import Filter from './_components/Filter';
import TitleText from './_components/TitleText';

import './_styles/index.css';

type Props = {
    searchParams: Promise<{
        type?: TVShowType,
        page?: string
    }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const searchParams = await props.searchParams;

    const type = searchParams.type || TVShowType.AIRING_TODAY;

    const normalizedType = type === TVShowType.AIRING_TODAY
        ? 'Airing today'
        : type === TVShowType.ON_THE_AIR
            ? 'On the air'
            : type === TVShowType.POPULAR
                ? 'Popular'
                : 'Top rated';
  
    return {
        title: `TV | ${ normalizedType }`
    };
}

export default async function Page(props: Props) {
    const searchParams = await props.searchParams;
    const type = searchParams.type || TVShowType.AIRING_TODAY;

    const currentPage = Number(searchParams.page ?? 1);

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [ 'tv-shows', type, currentPage ],
        queryFn: () => getTVShows(type, currentPage)
    });

    return (
        <Container className="p-tv-shows">
            <Filter type={ type } />

            <Title className="p-tv-shows__title">
                <TitleText type={ type } />
            </Title>

            <HydrationBoundary state={ dehydrate(queryClient) }>
                <Content
                    type={ type }
                    currentPage={ currentPage }
                />
            </HydrationBoundary>
        </Container>
    );
}