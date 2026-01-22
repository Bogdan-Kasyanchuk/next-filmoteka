import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import Container from '@/components/ui/layouts/Container';
import { MediaType } from '@/enums';
import generateMetaTags from '@/helpers/generateMetaTags';
import { pagesSearchUrl } from '@/routes';
import { getSearch } from '@/services/api';
import { Adult } from '@/types';

import './styles/index.css';
import Content from './components/Content';
import Filter from './components/Filter';
import Search from './components/Search';

export const metadata: Metadata = generateMetaTags(
    {
        title: 'Search',
        description: 'Movies, series, tv shows, actors and members of film crews',
        keywords: [ 'movies', 'series', 'tv shows', 'persons', 'actors', 'members of film crews' ],
        url: pagesSearchUrl()
    }
);

type Props = {
    params: Promise<{ page?: string[] }>,
    searchParams: Promise<{
        type?: 'multi' | MediaType,
        adult?: Adult,
        query?: string
    }>
};

export default async function Page(props: Props) {
    const params = await props.params;
    const searchParams = await props.searchParams;
    
    const type = searchParams.type || 'multi';
    const adult = searchParams.adult || 'false';
    const query = searchParams.query || '';
    const page = params.page ? Number(params.page[ 1 ]) : 1;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [ 'search', type, adult, query, page ],
        queryFn: () => getSearch(type, adult, query, page)
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