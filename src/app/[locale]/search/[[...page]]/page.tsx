import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale } from 'next-intl';
import { getExtracted, setRequestLocale } from 'next-intl/server';

import { MediaType } from '@/enums';
import { generalQueryKeys } from '@/helpers/queryKeys';
import { pagesSearchUrl } from '@/routes';
import { getSearch } from '@/services/tmdb/general';
import { Adult } from '@/types';
import generateMetaTags from '@/utils/generateMetaTags';
import isInvalidPage from '@/utils/isInvalidPage';
import normalizePage from '@/utils/normalizePage';
import withNotFound from '@/utils/withNotFound';

import Content from './components/Content';

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { locale } = await props.params;

    const t = await getExtracted({ locale });

    return generateMetaTags(
        {
            title: t('Search'),
            description: t('Search movies, tv shows, actors and film crew members of films and tv shows.'),
            path: pagesSearchUrl(),
            locale
        }
    );
}

type Props = {
    params: Promise<{ locale: Locale, page?: string[] }>,
    searchParams: Promise<{
        type?: 'multi' | MediaType,
        adult?: Adult,
        query?: string
    }>
};

export default async function Page(props: Props) {
    const [ params, searchParams ] = await Promise.all([
        props.params,
        props.searchParams
    ]);
    const { locale } = params;

    setRequestLocale(locale);
    
    const type = searchParams.type || 'multi';
    const adult = searchParams.adult || 'false';
    const query = searchParams.query || '';
    const page = params.page ? normalizePage(params.page[ 1 ]) : 1;

    if (params.page && isInvalidPage(params.page)) {
        notFound();
    }

    const queryClient = new QueryClient();

    await withNotFound(queryClient.fetchQuery({
        queryKey: generalQueryKeys.search(type, adult, query, page, locale),
        queryFn: () => getSearch(type, adult, query, page, locale)
    }));

    return (
        <HydrationBoundary state={ dehydrate(queryClient) }>
            <Content
                type={ type }
                adult={ adult }
                query={ query }
                page={ page }
            />
        </HydrationBoundary>
    );
}