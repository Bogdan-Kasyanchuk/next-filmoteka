import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale } from 'next-intl';
import { getExtracted, setRequestLocale } from 'next-intl/server';

import { MediaType } from '@/enums';
import { moviesQueryKeys } from '@/helpers/queryKeys';
import { pagesSimilarUrl } from '@/routes';
import { getCurrentMovieById, getSimilarMovies } from '@/services/tmdb/movies';
import generateMetaTags from '@/utils/generateMetaTags';
import isInvalidPage from '@/utils/isInvalidPage';
import normalizePage from '@/utils/normalizePage';
import withNotFound from '@/utils/withNotFound';

import Content from './components/Content';

import './styles/index.css';

type Props = {
    params: Promise<{
        locale: Locale,
        id: string,
        page?: string[]
    }>
};

// rendered on first request, then served from the cache and revalidated with the data
export function generateStaticParams() {
    return [];
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const { locale } = params;

    const t = await getExtracted({ locale });

    const data = await withNotFound(getCurrentMovieById(params.id, locale));

    const title = data.title || data.original_title;

    return generateMetaTags(
        {
            title: `${ title } | ${ t('Similar') }`,
            description: t('Similar movies to {title}.', { title }),
            path: pagesSimilarUrl(MediaType.MOVIE, params.id),
            locale
        }
    );
}

export default async function Page(props: Props) {
    const params = await props.params;
    const { locale } = params;

    setRequestLocale(locale);
    
    const page = params.page ? normalizePage(params.page[ 1 ]) : 1;

    if (params.page && isInvalidPage(params.page)) {
        notFound();
    }

    const queryClient = new QueryClient();

    const [ , similarData ] = await withNotFound(Promise.all([
        queryClient.fetchQuery(
            {
                queryKey: moviesQueryKeys.currentMovieById(params.id, locale),
                queryFn: () => getCurrentMovieById(params.id, locale)
            }
        ),
        queryClient.fetchQuery(
            {
                queryKey: moviesQueryKeys.similarMovies(params.id, page, locale),
                queryFn: () => getSimilarMovies(params.id, page, locale)
            }
        )
    ]));

    if (!similarData.results.length) {
        notFound();
    }

    return (
        <HydrationBoundary state={ dehydrate(queryClient) }>
            <Content
                id={ params.id }
                page={ page }
            />
        </HydrationBoundary>
    );
}