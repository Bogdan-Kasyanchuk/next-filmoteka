import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { getExtracted, setRequestLocale } from 'next-intl/server';
import { PropsWithChildren } from 'react';

import { TimeType } from '@/enums';
import generateMetaTags from '@/helpers/generateMetaTags';
import { homeQueryKeys } from '@/helpers/queryKeys';
import { pagesHomeUrl } from '@/routes';
import { getTrendings } from '@/services/tmdb/general';

import Content from './components/Content';

import './styles/index.css';

type Props = {
    params: Promise<{ locale: Locale }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { locale } = await props.params;

    const t = await getExtracted();

    return generateMetaTags(
        {
            title: t('Home'),
            description: t('Trending movies, series, tv shows, actors and members of film crews.'),
            keywords: [
                t('trending'),
                t('trending today'),
                t('trending this week'),
                t('movies'),
                t('tv shows'),
                t('persons'),
                t('actors'),
                t('film crew members')
            ],
            url: `/${ locale }${ pagesHomeUrl() }`,
            languages: {
                en: `/en${ pagesHomeUrl() }`,
                uk: `/uk${ pagesHomeUrl() }`
            }
        }
    );

}

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