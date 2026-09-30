import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { getExtracted, setRequestLocale } from 'next-intl/server';

import ErrorBoundary from '@/components/app/ErrorBoundary';
import PrefetchSuspense from '@/components/app/PrefetchSuspense';
import { RecommendationsSkeleton } from '@/components/app/Recommendations';
import Reviews, { ReviewsSkeleton } from '@/components/app/Reviews';
import Container from '@/components/ui/layouts/Container';
import { MediaType } from '@/enums';
import { generalQueryKeys, moviesQueryKeys } from '@/helpers/queryKeys';
import { pagesMovieUrl } from '@/routes';
import { getRecommendations, getReviews } from '@/services/tmdb/general';
import { getMovieById } from '@/services/tmdb/movies';
import { MovieShema } from '@/shemas';
import generateMetaTags from '@/utils/generateMetaTags';
import withNotFound from '@/utils/withNotFound';

import Content from './components/Content';
import Recommendations from './components/Recommendations';

import './styles/index.css';

type Props = {
    params: Promise<{ locale: Locale, id: string }>
};

// rendered on first request, then served from the cache and revalidated with the data
export function generateStaticParams() {
    return [];
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const { locale } = params;

    const t = await getExtracted({ locale });

    const data = await withNotFound(getMovieById(params.id, locale));

    const title = data.title || data.original_title;

    return generateMetaTags(
        {
            title,
            description: t('Detailed information about the movie {title}. Its overview, cast, crew, videos, reviews. Recommended movies.', { title }),
            path: pagesMovieUrl(params.id),
            locale
        }
    );
}

export default async function Page(props: Props) {
    const params = await props.params;
    const { locale } = params;

    setRequestLocale(locale);
    
    const queryClient = new QueryClient();

    const recommendationsKey = generalQueryKeys.recommendations(MediaType.MOVIE, params.id, locale);
    const reviewsKey = generalQueryKeys.reviews(MediaType.MOVIE, params.id, locale);

    // first pages of recommendations and reviews go into the dehydrated cache, so the client
    // doesn't request them again; "Load more" fetches the next pages on the client as before.
    // prefetchInfiniteQuery doesn't throw: on failure the client fetches them itself
    await Promise.all([
        withNotFound(queryClient.fetchQuery({
            queryKey: moviesQueryKeys.movieById(params.id, locale),
            queryFn: () => getMovieById(params.id, locale)
        })),
        queryClient.prefetchInfiniteQuery({
            queryKey: recommendationsKey,
            queryFn: ({ pageParam }) => getRecommendations<MovieShema>(
                MediaType.MOVIE,
                params.id,
                pageParam,
                locale
            ),
            initialPageParam: 1
        }),
        queryClient.prefetchInfiniteQuery({
            queryKey: reviewsKey,
            queryFn: ({ pageParam }) => getReviews(MediaType.MOVIE, params.id, pageParam),
            initialPageParam: 1
        })
    ]);

    const isPrefetched = (queryKey: string[]) => queryClient.getQueryState(queryKey)?.status === 'success';

    return (
        <div className="p-movie">
            <HydrationBoundary state={ dehydrate(queryClient) }>
                <Content id={ params.id } />

                <Container className="p-movie__container">
                    <ErrorBoundary>
                        <PrefetchSuspense
                            isPrefetched={ isPrefetched(recommendationsKey) }
                            fallback={ <RecommendationsSkeleton /> }
                        >
                            <Recommendations id={ params.id } />
                        </PrefetchSuspense>
                    </ErrorBoundary>

                    <ErrorBoundary>
                        <PrefetchSuspense
                            isPrefetched={ isPrefetched(reviewsKey) }
                            fallback={ <ReviewsSkeleton /> }
                        >
                            <Reviews
                                type={ MediaType.MOVIE }
                                id={ params.id }
                            />
                        </PrefetchSuspense>
                    </ErrorBoundary>
                </Container>
            </HydrationBoundary>
        </div>
    );
}