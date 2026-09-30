import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { getExtracted, setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

import ErrorBoundary from '@/components/app/ErrorBoundary';
import { RecommendationsSkeleton } from '@/components/app/Recommendations';
import Reviews, { ReviewsSkeleton } from '@/components/app/Reviews';
import Container from '@/components/ui/layouts/Container';
import { MediaType } from '@/enums';
import { tvShowsQueryKeys } from '@/helpers/queryKeys';
import { pagesTVShowUrl } from '@/routes';
import { getTVShowById } from '@/services/tmdb/tvShows';
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

    const data = await withNotFound(getTVShowById(params.id, locale));

    const title = data.name || data.original_name;

    return generateMetaTags(
        {
            title,
            description: t('Detailed information about the tv show {title}. Its overview, cast, crew, seasons, videos, reviews. Recommended tv shows.', { title }),
            path: pagesTVShowUrl(params.id),
            locale
        }
    );
}

export default async function Page(props: Props) {
    const params = await props.params;
    const { locale } = params;

    setRequestLocale(locale);

    const queryClient = new QueryClient();

    await withNotFound(queryClient.fetchQuery({
        queryKey: tvShowsQueryKeys.tvShowById(params.id, locale),
        queryFn: () => getTVShowById(params.id, locale)
    }));

    return (
        <div className="p-tv-show">
            <HydrationBoundary state={ dehydrate(queryClient) }>
                <Content id={ params.id } />
            </HydrationBoundary>

            <Container className="p-tv-show__container">
                <ErrorBoundary>
                    <Suspense fallback={ <RecommendationsSkeleton /> }>
                        <Recommendations id={ params.id } />
                    </Suspense>
                </ErrorBoundary>

                <ErrorBoundary>
                    <Suspense fallback={ <ReviewsSkeleton /> }>
                        <Reviews
                            type={ MediaType.TV_SHOW }
                            id={ params.id }
                        />
                    </Suspense>
                </ErrorBoundary>
            </Container>
        </div>
    );
}
