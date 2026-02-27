import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getExtracted, getLocale } from 'next-intl/server';

import { MediaType } from '@/enums';
import { moviesQueryKeys } from '@/helpers/queryKeys';
import { pagesSimilarUrl } from '@/routes';
import { getCurrentMovieById, getSimilarMovies } from '@/services/tmdb/movies';
import { CurrentMovieShema, DataShema, SimilarMovieShema } from '@/shemas';
import generateMetaTags from '@/utils/generateMetaTags';
import isInvalidPage from '@/utils/isInvalidPage';
import normalizePage from '@/utils/normalizePage';

import Content from './components/Content';

import './styles/index.css';

type Props = {
    params: Promise<{
        id: string,
        page?: string[]
    }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const [ locale, params ] = await Promise.all([
        getLocale(),
        props.params
    ]);

    const t = await getExtracted();

    const data = await getCurrentMovieById(params.id, locale);

    const title = data.title || data.original_title;

    return generateMetaTags(
        {
            title: `${ title } | ${ t('Similar') }`,
            description: t('Similar movies to {title}.', { title }),
            keywords: [
                title,
                t('similar to {title}', { title })
            ],
            url: `/${ locale }/${ pagesSimilarUrl(MediaType.MOVIE, params.id) }`,
            languages: {
                en: `/en/${ pagesSimilarUrl(MediaType.MOVIE, params.id) }`,
                uk: `/uk/${ pagesSimilarUrl(MediaType.MOVIE, params.id) }`
            }
        }
    );
}

export default async function Page(props: Props) {
    const [ locale, params ] = await Promise.all([
        getLocale(),
        props.params
    ]);
    
    const page = params.page ? normalizePage(params.page[ 1 ]) : 1;

    if (params.page && isInvalidPage( params.page[ 0 ], page)) {
        notFound();
    }

    const queryClient = new QueryClient();

    await Promise.all([
        queryClient.prefetchQuery(
            {
                queryKey: moviesQueryKeys.currentMovieById(params.id, locale),
                queryFn: () => getCurrentMovieById(params.id, locale)
            }
        ),
        queryClient.prefetchQuery(
            {
                queryKey: moviesQueryKeys.similarMovies(params.id, page, locale),
                queryFn: () => getSimilarMovies(params.id, page, locale)
            }
        )
    ]);

    const movieData = queryClient.getQueryData<CurrentMovieShema>(
        moviesQueryKeys.currentMovieById(params.id, locale)
    );

    const similarData = queryClient.getQueryData<DataShema<SimilarMovieShema>>(
        moviesQueryKeys.similarMovies(params.id, page, locale)
    );
                
    if (!movieData || !similarData || !similarData.results.length) {
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