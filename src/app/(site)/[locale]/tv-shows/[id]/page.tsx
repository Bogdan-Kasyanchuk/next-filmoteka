import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { Suspense } from 'react';

import { RecommendationsSkeleton } from '@/components/app/Recommendations';
import Reviews, { ReviewsSkeleton } from '@/components/app/Reviews';
import Videos, { VideosSkeleton } from '@/components/app/Videos';
import { MediaType } from '@/enums';
import generateMetaTags from '@/helpers/generateMetaTags';
import { tvShowsQueryKeys } from '@/helpers/queryKeys';
import { pagesTVShowUrl } from '@/routes';
import { getTVShowById } from '@/services/tmdb/tvShows';

import Content from './components/Content';
import Recommendations from './components/Recommendations';

import './styles/index.css';

type Props = {
    params: Promise<{ id: string }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const locale = await getLocale();
        
    const params = await props.params;
        
    const data = await getTVShowById(params.id, locale);

    const title = data.name || data.original_name;

    return generateMetaTags(
        {
            title,
            description: `Detailed information about the tv show ${ title }. Its overview, cast, crew, seasons, videos, reviews. Recommended tv shows.`,
            keywords: [
                title,
                `cast of ${ title }`,
                `crew of ${ title }`,
                `seasons of ${ title }`,
                `videos of ${ title }`,
                `reviews of ${ title }`,
                `recommended of ${ title }`
            ],
            url: pagesTVShowUrl(params.id)
        }
    );
}

export default async function Page(props: Props) {
    const locale = await getLocale();
        
    const params = await props.params;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: tvShowsQueryKeys.tvShowById(params.id, locale),
        queryFn: () => getTVShowById(params.id, locale)
    });

    return (
        <div className="p-tv-show">
            <HydrationBoundary state={ dehydrate(queryClient) }>
                <Content id={ params.id } />
            </HydrationBoundary>

            <Suspense fallback={ <VideosSkeleton /> }>
                <Videos
                    type={ MediaType.TV_SHOW }
                    id={ params.id }
                />
            </Suspense>
            
            <Suspense fallback={ <RecommendationsSkeleton /> }>
                <Recommendations id={ params.id } />
            </Suspense>
            
            <Suspense fallback={ <ReviewsSkeleton /> }>
                <Reviews
                    type={ MediaType.TV_SHOW }
                    id={ params.id }
                />
            </Suspense>
        </div>
    );
}