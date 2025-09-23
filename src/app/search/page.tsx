import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';

import Container from '@/components/ui/layouts/Container';
import { MediaType } from '@/enums';
import { getSearch } from '@/services/api';
import { Adult } from '@/types';

import Content from './_components/Content';
import Filter from './_components/Filter';
import Search from './_components/Search';

import './_styles/index.css';

export const metadata: Metadata = {
    title: 'Search',
};

type Props = {
    searchParams: Promise<{
        type?: 'multi' | MediaType;
        adult?: Adult;
        query?: string;
        page?: string;
    }>
};

export default async function Page(props: Props) {
    const searchParams = await props.searchParams;
    const type = searchParams.type || 'multi';
    const adult = searchParams.adult || 'false';
    const query = searchParams.query || '';
    const currentPage = Number(searchParams.page) || 1;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['search', type, adult, query, currentPage],
        queryFn: () => getSearch(type, adult, query, currentPage),
    });

    return (
        <Container className='p-search'>
            <Search />

            <Filter
                type={type}
                adult={adult}
            />

            <HydrationBoundary state={dehydrate(queryClient)}>
                <Content
                    type={type}
                    adult={adult}
                    query={query}
                    currentPage={currentPage}
                />
            </HydrationBoundary>
        </Container>
    );
}