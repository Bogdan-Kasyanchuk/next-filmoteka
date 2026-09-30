import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { getExtracted, setRequestLocale } from 'next-intl/server';
import { PropsWithChildren } from 'react';

import { TimeType } from '@/enums';
import { homeQueryKeys } from '@/helpers/queryKeys';
import { pagesHomeUrl } from '@/routes';
import { getTrendings } from '@/services/tmdb/general';
import generateMetaTags from '@/utils/generateMetaTags';

import Content from './components/Content';

import './styles/index.css';

type Props = {
    params: Promise<{ locale: Locale }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { locale } = await props.params;

    const t = await getExtracted({ locale });

    return generateMetaTags(
        {
            title: t('Home'),
            description: t('Trending movies, series, tv shows, actors and members of film crews.'),
            path: pagesHomeUrl(),
            locale
        }
    );
}

export default async function Page(props: PropsWithChildren<Props>) {
    const { locale } = await props.params;

    setRequestLocale(locale);

    const queryClient = new QueryClient();

    await Promise.all([
        queryClient.prefetchQuery(
            {
                queryKey: homeQueryKeys.trendingsDay(locale),
                queryFn: () => getTrendings('all', TimeType.DAY, 1, locale)
            }
        ),
        queryClient.prefetchQuery(
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