import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { MediaType } from '@/enums';
import { getSimilars } from '@/services/api';
import { MovieShema } from '@/shemas';

import Content from './_components/Content';

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
        queryKey: ['similar', id, currentPage],
        queryFn: () => getSimilars<MovieShema>(MediaType.MOVIE, id, currentPage),
    });

    return (
        <Container className='p-movie-similar'>
            <Title className='font-bold uppercase text-center'>
                Similar to the {id}
            </Title>

            <HydrationBoundary state={dehydrate(queryClient)}>
                <Content
                    id={id}
                    currentPage={currentPage}
                />
            </HydrationBoundary>
        </Container >
    );
}