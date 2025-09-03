import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';

import Container from '@/components/ui/layouts/Container';
import { getSearch } from '@/services/api';

import Content from './_components/Content';
import Search from './_components/Search';

import './_styles/index.css';

export const metadata: Metadata = {
    title: 'Search',
};

type Props = {
    searchParams: Promise<{
        query?: string;
        page?: string;
    }>
};

export default async function Page(props: Props) {
    const searchParams = await props.searchParams;
    const query = searchParams.query || '';
    const currentPage = Number(searchParams.page) || 1;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['search', query, currentPage],
        queryFn: () => getSearch(query, currentPage),
    });

    return (
        <Container className='p-search'>
            <Search />

            <HydrationBoundary state={dehydrate(queryClient)}>
                <Content
                    query={query}
                    currentPage={currentPage}
                />
            </HydrationBoundary>
        </Container>
    );
}