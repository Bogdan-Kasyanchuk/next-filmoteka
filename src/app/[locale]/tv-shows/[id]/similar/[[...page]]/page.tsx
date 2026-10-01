import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale } from 'next-intl';
import { getExtracted, setRequestLocale } from 'next-intl/server';

import { MediaType } from '@/enums';
import { tvShowsQueryKeys } from '@/helpers/queryKeys';
import { pagesSimilarUrl } from '@/routes';
import { getCurrentTVShowById, getSimilarTVShows } from '@/services/tmdb/tvShows';
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
        
    const data = await withNotFound(getCurrentTVShowById(params.id, locale));

    const title = data.name || data.original_name;

    return generateMetaTags(
        {
            title: `${ title } | ${ t('Similar') }`,
            description: t('Similar tv shows to {title}.', { title }),
            path: pagesSimilarUrl(MediaType.TV_SHOW, params.id),
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
                queryKey: tvShowsQueryKeys.currentTvShowById(params.id, locale),
                queryFn: () => getCurrentTVShowById(params.id, locale)
            }
        ),
        queryClient.fetchQuery(
            {
                queryKey: tvShowsQueryKeys.similartvShows(params.id, page, locale),
                queryFn: () => getSimilarTVShows(params.id, page, locale)
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