import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale } from 'next-intl';
import { getExtracted, setRequestLocale } from 'next-intl/server';

import { tvShowsQueryKeys } from '@/helpers/queryKeys';
import { pagesSeasonUrl } from '@/routes';
import { getCurrentTVShowById, getTVShowSeasonByNumber } from '@/services/tmdb/tvShows';
import generateMetaTags from '@/utils/generateMetaTags';
import withNotFound from '@/utils/withNotFound';

import Content from './components/Content';

import './styles/index.css';

type Props = {
    params: Promise<{
        locale: Locale,
        id: string,
        season: string
    }>
};

const isInvalidSeason = (season: string) => !/^(0|[1-9]\d*)$/.test(season);

// rendered on first request, then served from the cache and revalidated with the data
export function generateStaticParams() {
    return [];
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const { locale } = params;

    if (isInvalidSeason(params.season)) {
        notFound();
    }

    const t = await getExtracted({ locale });

    const data = await withNotFound(getCurrentTVShowById(params.id, locale));

    const title = data.name || data.original_name;

    return generateMetaTags(
        {
            title: `${ title } | ${ t('Season') } ${ params.season }`,
            description: t('Detailed information about the season {season} of the tv show {title}. Its overview, episodes.', {
                season: params.season,
                title: title
            }),
            path: pagesSeasonUrl(params.id, Number(params.season)),
            locale
        }
    );
}

export default async function Page(props: Props) {
    const params = await props.params;
    const { locale } = params;

    setRequestLocale(locale);

    if (isInvalidSeason(params.season)) {
        notFound();
    }

    const season = Number(params.season);

    const queryClient = new QueryClient();

    await withNotFound(Promise.all([
        queryClient.fetchQuery(
            {
                queryKey: tvShowsQueryKeys.currentTvShowById(params.id, locale),
                queryFn: () => getCurrentTVShowById(params.id, locale)
            }
        ),
        queryClient.fetchQuery(
            {
                queryKey: tvShowsQueryKeys.seasonById(params.id, season, locale),
                queryFn: () => getTVShowSeasonByNumber(params.id, season, locale)
            }
        )
    ]));

    return (
        <HydrationBoundary state={ dehydrate(queryClient) }>
            <Content
                id={ params.id }
                season={ season }
            />
        </HydrationBoundary>
    );
}