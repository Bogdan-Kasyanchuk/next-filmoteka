import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { getExtracted, getLocale } from 'next-intl/server';

import generateMetaTags from '@/helpers/generateMetaTags';
import { moviesQueryKeys } from '@/helpers/queryKeys';
import { pagesMovieUrl } from '@/routes';
import { getMovieById } from '@/services/tmdb/movies';

import Content from './components/Content';

import './styles/index.css';

type Props = {
    params: Promise<{ id: string }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const [ locale, params ] = await Promise.all([
        getLocale(),
        props.params
    ]);

    const t = await getExtracted();

    const data = await getMovieById(params.id, locale);

    const title = data.title || data.original_title;

    return generateMetaTags(
        {
            title,
            description: t('Detailed information about the movie {title}. Its overview, cast, crew, videos, reviews. Recommended movies.', { title }),
            keywords: [
                title,
                t('cast of {title}', { title }),
                t('crew of {title}', { title }),
                t('videos of {title}', { title }),
                t('reviews of {title}', { title }),
                t('recommended movies for {title}', { title })
            ],
            url: `/${ locale }/${ pagesMovieUrl(params.id) }`,
            languages: {
                en: `/en/${ pagesMovieUrl(params.id) }`,
                uk: `/uk/${ pagesMovieUrl(params.id) }`
            }
        }
    );
}

export default async function Page(props: Props) {
    const [ locale, params ] = await Promise.all([
        getLocale(),
        props.params
    ]);
    
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: moviesQueryKeys.movieById(params.id, locale),
        queryFn: () => getMovieById(params.id, locale)
    });

    return (
        <HydrationBoundary state={ dehydrate(queryClient) }>
            <Content id={ params.id } />
        </HydrationBoundary>
    );
}