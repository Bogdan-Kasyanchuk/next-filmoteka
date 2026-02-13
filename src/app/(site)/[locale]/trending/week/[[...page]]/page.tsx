import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getExtracted, getLocale } from 'next-intl/server';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { MediaType, TimeType } from '@/enums';
import generateMetaTags from '@/helpers/generateMetaTags';
import { trendingsQueryKeys } from '@/helpers/queryKeys';
import { pagesTrendingWeekUrl } from '@/routes';
import { getTrendings } from '@/services/tmdb/general';
import isInvalidPage from '@/utils/isInvalidPage';
import normalizePage from '@/utils/normalizePage';

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
            title: `Trending this week | ${ normalizedType }`,
            description: 'Trending this week movies, tv shows, actors and film crew members of films and tv shows.',
            keywords: [
                'trending',
                'trending this week', 
                'movies',
                'tv shows',
                'persons',
                'actors',
                'film crew members'
            ],
            url: pagesTrendingWeekUrl()
        }
    );
}

export default async function Page(props: Props) {
    const [ locale, params, searchParams ] = await Promise.all([
        getLocale(),
        props.params,
        props.searchParams
    ]);

    const t = await getExtracted();

    const type = searchParams.type || 'all';
    const page = params.page ? normalizePage(params.page[ 1 ]) : 1;

    if (params.page && isInvalidPage( params.page[ 0 ], page)) {
        notFound();
    }

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: trendingsQueryKeys.trendingsWeek(type, page, locale),
        queryFn: () => getTrendings(type, TimeType.WEEK, page, locale)
    });

    return (
        <Container className="p-trending">
            <Filter type={ type } />

            <Title className="p-trending__title">
                { t('Trending this week') }
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