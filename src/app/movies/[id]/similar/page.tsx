import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';

import Container from '@/components/ui/layouts/Container';
import { MediaType } from '@/enums';
import { getMovieById, getSimilars } from '@/services/api';
import { MovieShema } from '@/shemas';

import Content from './_components/Content';
import CurrentMovie from './_components/CurrentMovie';

import './_styles/index.css';

type Props = {
    params: Promise<{ id: string }>,
    searchParams: Promise<{ page?: string }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { id } = await props.params;

    return {
        title: `${id}: similar`
    };
}

export default async function Page(props: Props) {
    const { id } = await props.params;
    const searchParams = await props.searchParams;
    const currentPage = Number(searchParams.page) || 1;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['movies', id],
        queryFn: () => getMovieById(id),
    });

    await queryClient.prefetchQuery({
        queryKey: ['similar', id, currentPage],
        queryFn: () => getSimilars<MovieShema>(MediaType.MOVIE, id, currentPage),
    });

    return (
        <Container className='p-movie-similar'>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <CurrentMovie id={id} />

                <Content
                    id={id}
                    currentPage={currentPage}
                />
            </HydrationBoundary>
        </Container >
    );
}