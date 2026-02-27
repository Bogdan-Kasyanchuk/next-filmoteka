import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getExtracted, getLocale } from 'next-intl/server';

import { MediaType } from '@/enums';
import { tvShowsQueryKeys } from '@/helpers/queryKeys';
import { pagesSimilarUrl } from '@/routes';
import { getCurrentTVShowById, getSimilarTVShows } from '@/services/tmdb/tvShows';
import { CurrentTVShowShema, DataShema, SimilarTVShowShema } from '@/shemas';
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
        
    const data = await getCurrentTVShowById(params.id, locale);

    const title = data.name || data.original_name;

    return generateMetaTags(
        {
            title: `${ title } | ${ t('Similar') }`,
            description: `Similar tv shows to ${ title }.`,
            keywords: [
                title,
                t('similar to {title}', { title })
            ],
            url: `/${ locale }/${ pagesSimilarUrl(MediaType.TV_SHOW, params.id) }`,
            languages: {
                en: `/en/${ pagesSimilarUrl(MediaType.TV_SHOW, params.id) }`,
                uk: `/uk/${ pagesSimilarUrl(MediaType.TV_SHOW, params.id) }`
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
        await queryClient.prefetchQuery(
            {
                queryKey: tvShowsQueryKeys.currentTvShowById(params.id, locale),
                queryFn: () => getCurrentTVShowById(params.id, locale)
            }
        ),
        await queryClient.prefetchQuery(
            {
                queryKey: tvShowsQueryKeys.similartvShows(params.id, page, locale),
                queryFn: () => getSimilarTVShows(params.id, page, locale)
            }
        )
    ]);

    const tvShowData = queryClient.getQueryData<CurrentTVShowShema>(
        tvShowsQueryKeys.currentTvShowById(params.id, locale)
    );
    
    const similarData = queryClient.getQueryData<DataShema<SimilarTVShowShema>>(
        tvShowsQueryKeys.similartvShows(params.id, page, locale)
    );
                    
    if (!tvShowData || !similarData || !similarData.results.length) {
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