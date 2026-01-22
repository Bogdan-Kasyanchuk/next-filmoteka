import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import { TimeType } from '@/enums';
import generateMetaTags from '@/helpers/generateMetaTags';
import { pagesHomeUrl } from '@/routes';
import { getTrendings } from '@/services/api';

import Content from './components/Content';

import './styles/index.css';

export const metadata: Metadata = generateMetaTags(
    {
        title: 'Home',
        description: 'Trending movies, series, tv shows, actors and members of film crews',
        keywords: [ 'trending', 'movies', 'series', 'tv shows', 'persons', 'actors', 'members of film crews', 'casts', 'crews' ],
        url: pagesHomeUrl()
    }
);

export default async function Page() {
    const queryClient = new QueryClient();

    await Promise.all([
        await queryClient.prefetchQuery(
            {
                queryKey: [ 'trendings', 'all', TimeType.DAY ],
                queryFn: () => getTrendings('all', TimeType.DAY, 1)
            }
        ),
        await queryClient.prefetchQuery(
            {
                queryKey: [ 'trendings', 'all', TimeType.WEEK ],
                queryFn: () => getTrendings('all', TimeType.WEEK, 1)
            }
        )
    ]);

    return (
        <HydrationBoundary state={ dehydrate(queryClient) }>
            <Content />
        </HydrationBoundary>
    );
}