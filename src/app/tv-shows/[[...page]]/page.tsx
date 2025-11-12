import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { TVShowType } from '@/enums';
import { getTVShows } from '@/services/api';

import Content from './components/Content';
import Filter from './components/Filter';
import TitleText from './components/TitleText';

import './styles/index.css';

type Props = {
    params: Promise<{ page?: string[] }>,
    searchParams: Promise<{
        type?: TVShowType
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
        title: `TV Shows | ${ normalizedType }`
    };
}

export default async function Page(props: Props) {
    const params = await props.params;
    const searchParams = await props.searchParams;

    const type = searchParams.type || TVShowType.AIRING_TODAY;
    const page = params.page ? Number(params.page[ 1 ]) : 1;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [ 'tv-shows', type, page ],
        queryFn: () => getTVShows(type, page)
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
                    page={ page }
                />
            </HydrationBoundary>
        </Container>
    );
}