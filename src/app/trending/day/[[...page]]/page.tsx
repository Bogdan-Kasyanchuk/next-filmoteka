import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { MediaType, TimeType } from '@/enums';
import generateMetaTags from '@/helpers/generateMetaTags';
import { pagesTrendingDayUrl } from '@/routes';
import { getTrendings } from '@/services/api';

import Content from './components/Content';
import Filter from '../../components/Filter';

import '../../styles/index.css';

type Props = {
    params: Promise<{ page?: string[] }>,
    searchParams: Promise<{
        type?: 'all' | MediaType
    }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const searchParams = await props.searchParams;

    const type = searchParams.type || 'all';

    const normalizedType = type === MediaType.MOVIE
        ? 'Movies'
        : type === MediaType.TV_SHOW
            ? 'TV Shows'
            : type === MediaType.PERSON
                ? 'Persons'
                : 'All';
  
    return generateMetaTags(
        {
            title: `Trending today | ${ normalizedType }`,
            description: 'Trending today movies, series, tv shows, actors and members of film crews',
            keywords: [ 'trending', 'trending today', 'movies', 'series', 'tv shows', 'persons', 'actors', 'members of film crews' ],
            url: pagesTrendingDayUrl()
        }
    );
}

export default async function Page(props: Props) {
    const params = await props.params;
    const searchParams = await props.searchParams;

    const type = searchParams.type || 'all';
    const page = params.page ? Number(params.page[ 1 ]) : 1;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [ 'trendings', type, TimeType.DAY, page ],
        queryFn: () => getTrendings(type, TimeType.DAY, page)
    });

    return (
        <Container className="p-trending">
            <Filter type={ type } />

            <Title className="p-trending__title">
                 Trending today
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