import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

import generateMetaTags from '@/helpers/generateMetaTags';
import { tvShowsQueryKeys } from '@/helpers/queryKeys';
import { pagesSeasonUrl } from '@/routes';
import { getCurrentTVShowById, getTVShowSeasonByNumber } from '@/services/tmdb/tvShows';

import Content from './components/Content';

import './styles/index.css';

type Props = {
    params: Promise<{
        id: string,
        season: string
    }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const locale = await getLocale();

    const params = await props.params;

    const data = await getCurrentTVShowById(params.id, locale);

    const title = data.name || data.original_name;

    return generateMetaTags(
        {
            title: `${ title } | Season ${ params.season }`,
            description: `Detailed information about the season ${ params.season } of the tv show ${ title }.  Its overview, episodes.`,
            keywords: [
                title,
                `season ${ params.season } of the ${ title }`,
                `episodes of season ${ params.season } of the ${ title }`
            ],
            url: pagesSeasonUrl(params.id, Number(params.season))
        }
    );
}

export default async function Page(props: Props) {
    const locale = await getLocale();
        
    const params = await props.params;

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