import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { getExtracted, getLocale } from 'next-intl/server';

import { tvShowsQueryKeys } from '@/helpers/queryKeys';
import { pagesSeasonUrl } from '@/routes';
import { getCurrentTVShowById, getTVShowSeasonByNumber } from '@/services/tmdb/tvShows';
import generateMetaTags from '@/utils/generateMetaTags';

import Content from './components/Content';

import './styles/index.css';

type Props = {
    params: Promise<{
        id: string,
        season: string
    }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const [ locale, params ] = await Promise.all([
        getLocale(),
        props.params
    ]);

    const t = await getExtracted();

    const data = await getCurrentTVShowById(params.id, locale);

    const title = data.name || data.original_name;

    return generateMetaTags(
        {
            title: `${ title } | ${ t('Season') } ${ params.season }`,
            description: t('Detailed information about the season {season} of the tv show {title}. Its overview, episodes.', {
                season: params.season,
                title: title
            }),
            keywords: [
                title,
                t('cast of {title}', { title }),
                t('cast of {title}', { title }),
                t('season {season} of the {title}', {
                    season: params.season,
                    title: title
                }),
                t('episodes of season {season} of the {title}', {
                    season: params.season,
                    title: title
                })
            ],
            url: `/${ locale }/${ pagesSeasonUrl(params.id, Number(params.season)) }`,
            languages: {
                en: `/en/${ pagesSeasonUrl(params.id, Number(params.season)) }`,
                uk: `/uk/${ pagesSeasonUrl(params.id, Number(params.season)) }`
            }
        }
    );
}

export default async function Page(props: Props) {
    const [ locale, params ] = await Promise.all([
        getLocale(),
        props.params
    ]);

    const season = Number(params.season);

    const queryClient = new QueryClient();

    await Promise.all([
        await queryClient.prefetchQuery(
            {
                queryKey: tvShowsQueryKeys.currentTvShowById(params.id, locale),
                queryFn: () => getCurrentTVShowById(params.id, locale)
            }
        ),
        await queryClient.prefetchQuery(
            {
                queryKey: tvShowsQueryKeys.seasonById(params.id, season, locale),
                queryFn: () => getTVShowSeasonByNumber(params.id, season, locale)
            }
        )
    ]);

    return (
        <HydrationBoundary state={ dehydrate(queryClient) }>
            <Content
                id={ params.id }
                season={ season }
            />
        </HydrationBoundary>
    );
}