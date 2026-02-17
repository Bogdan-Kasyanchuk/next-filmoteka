import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getExtracted, getLocale } from 'next-intl/server';

import Container from '@/components/ui/layouts/Container';
import { MediaType } from '@/enums';
import generateMetaTags from '@/helpers/generateMetaTags';
import { generalQueryKeys } from '@/helpers/queryKeys';
import { pagesSearchUrl } from '@/routes';
import { getSearch } from '@/services/tmdb/general';
import { Adult } from '@/types';
import isInvalidPage from '@/utils/isInvalidPage';
import normalizePage from '@/utils/normalizePage';

import Content from './components/Content';
import Filter from './components/Filter';
import Search from './components/Search';

import './styles/index.css';

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();

    const t = await getExtracted();

    return generateMetaTags(
        {
            title: t('Search'),
            description: t('Search movies, tv shows, actors and film crew members of films and tv shows.'),
            keywords: [
                t('search'),
                t('movies'),
                t('tv shows'),
                t('persons'),
                t('actors'),
                t('film crew members')
            ],
            url: `/${ locale }${ pagesSearchUrl() }`,
            languages: {
                en: `/en${ pagesSearchUrl() }`,
                uk: `/uk${ pagesSearchUrl() }`
            },
            index: false,
            follow: false
        }
    );
}

type Props = {
    params: Promise<{ page?: string[] }>,
    searchParams: Promise<{
        type?: 'multi' | MediaType,
        adult?: Adult,
        query?: string
    }>
};

export default async function Page(props: Props) {
    const [ locale, params, searchParams ] = await Promise.all([
        getLocale(),
        props.params,
        props.searchParams
    ]);
    
    const type = searchParams.type || 'multi';
    const adult = searchParams.adult || 'false';
    const query = searchParams.query || '';
    const page = params.page ? normalizePage(params.page[ 1 ]) : 1;

    if (params.page && isInvalidPage( params.page[ 0 ], page)) {
        notFound();
    }

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: generalQueryKeys.search(type, adult, query, page, locale),
        queryFn: () => getSearch(type, adult, query, page, locale)
    });

    return (
        <Container className="p-search">
            <div className="p-search__head">
                <Search />

                <Filter
                    type={ type }
                    adult={ adult }
                />
            </div>

            <HydrationBoundary state={ dehydrate(queryClient) }>
                <Content
                    type={ type }
                    adult={ adult }
                    query={ query }
                    page={ page }
                />
            </HydrationBoundary>
        </Container>
    );
}