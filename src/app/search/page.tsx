import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';

import Container from '@/components/ui/layouts/Container';
import { MediaType } from '@/enums';
import { getSearch } from '@/services/api';

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
        query?: string;
        page?: string;
    }>
};

export default async function Page(props: Props) {
    const searchParams = await props.searchParams;
    const type = searchParams.type || 'multi';
    const query = searchParams.query || '';
    const currentPage = Number(searchParams.page) || 1;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['search', type, query, currentPage],
        queryFn: () => getSearch(type, query, currentPage),
    });

    return (
        <Container className='p-search'>
            <Search />

            <Filter type={type} />

            <HydrationBoundary state={dehydrate(queryClient)}>
                <Content
                    type={type}
                    query={query}
                    currentPage={currentPage}
                />
            </HydrationBoundary>
        </Container>
    );
}