import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { PropsWithChildren } from 'react';

import { TimeType } from '@/enums';
import generateMetaTags from '@/helpers/generateMetaTags';
import { homeQueryKeys } from '@/helpers/queryKeys';
import { pagesHomeUrl } from '@/routes';
import { getTrendings } from '@/services/tmdb/general';

import Content from './components/Content';

import './styles/index.css';

export const metadata: Metadata = generateMetaTags(
    {
        title: 'Home',
        description: 'Trending movies, series, tv shows, actors and members of film crews.',
        keywords: [
            'trending',
            'trending today',
            'trending this week',
            'movies',
            'tv shows',
            'persons',
            'actors',
            'film crew members'
        ],
        url: pagesHomeUrl()
    }
);

type Props = {
    params: Promise<{ locale: Locale }>
};

export default async function Page(props: PropsWithChildren<Props>) {
    const { locale } = await props.params;

    setRequestLocale(locale);
      
    const queryClient = new QueryClient();

    await Promise.all([
        await queryClient.prefetchQuery(
            {
                queryKey: homeQueryKeys.trendingsDay(locale),
                queryFn: () => getTrendings('all', TimeType.DAY, 1, locale)
            }
        ),
        await queryClient.prefetchQuery(
            {
                queryKey: homeQueryKeys.trendingsWeek(locale),
                queryFn: () => getTrendings('all', TimeType.WEEK, 1, locale)
            }
        )
    ]);

    return (
        <HydrationBoundary state={ dehydrate(queryClient) }>
            <Content />
        </HydrationBoundary>
    );
}