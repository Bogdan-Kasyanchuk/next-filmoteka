import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale } from 'next-intl';
import { getExtracted, setRequestLocale } from 'next-intl/server';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { MediaType, TimeType } from '@/enums';
import { trendingsQueryKeys } from '@/helpers/queryKeys';
import { pagesTrendingWeekUrl } from '@/routes';
import { getTrendings } from '@/services/tmdb/general';
import generateMetaTags from '@/utils/generateMetaTags';
import isInvalidPage from '@/utils/isInvalidPage';
import normalizePage from '@/utils/normalizePage';
import withNotFound from '@/utils/withNotFound';

import Content from './components/Content';
import Filter from '../../components/Filter';

import '../../styles/index.css';

type Props = {
    params: Promise<{ locale: Locale, page?: string[] }>,
    searchParams: Promise<{
        type?: 'all' | MediaType
    }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const [ { locale }, searchParams ] = await Promise.all([
        props.params,
        props.searchParams
    ]);

    const t = await getExtracted({ locale });

    const type = searchParams.type || 'all';

    const normalizedType = type === MediaType.MOVIE
        ? t('Movies')
        : type === MediaType.TV_SHOW
            ? t('TV Shows')
            : type === MediaType.PERSON
                ? t('Persons')
                : t('All');
  
    return generateMetaTags(
        {
            title: `${ t('Trending this week') } | ${ normalizedType }`,
            description: t('Trending this week movies, tv shows, actors and film crew members of films and tv shows.'),
            path: pagesTrendingWeekUrl(),
            locale
        }
    );
}

export default async function Page(props: Props) {
    const [ params, searchParams ] = await Promise.all([
        props.params,
        props.searchParams
    ]);
    const { locale } = params;

    setRequestLocale(locale);

    const t = await getExtracted({ locale });

    const type = searchParams.type || 'all';
    const page = params.page ? normalizePage(params.page[ 1 ]) : 1;

    if (params.page && isInvalidPage(params.page)) {
        notFound();
    }

    const queryClient = new QueryClient();

    const data = await withNotFound(queryClient.fetchQuery({
        queryKey: trendingsQueryKeys.trendingsWeek(type, page, locale),
        queryFn: () => getTrendings(type, TimeType.WEEK, page, locale)
    }));

    if (!data.results.length) {
        notFound();
    }

    return (
        <Container className="p-trending">
            <Filter
                type={ type }
                path={ pagesTrendingWeekUrl() }
            />

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