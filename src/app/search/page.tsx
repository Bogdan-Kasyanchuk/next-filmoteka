import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';

import Container from '@/components/ui/layouts/Container';
import { MovieType } from '@/enums';
import { getMovies } from '@/services/api';

import Content from './_components/Content';

import './_styles/index.css';

export const metadata: Metadata = {
    title: 'Movies',
};

type Props = {
    searchParams: Promise<{
        type?: MovieType;
        page?: string;
    }>
};

export default async function Page(props: Props) {
    const searchParams = await props.searchParams;
    const type = searchParams.type || MovieType.NOW_PLAYING;
    const currentPage = Number(searchParams.page) || 1;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['movies', type, currentPage],
        queryFn: () => getMovies(type, currentPage),
    });

    return (
        <Container className='p-movies'>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Content
                    type={type}
                    currentPage={currentPage}
                />
            </HydrationBoundary>
        </Container>
    );
}