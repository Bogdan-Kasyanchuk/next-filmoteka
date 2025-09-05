import { dehydrate, QueryClient, HydrationBoundary } from '@tanstack/react-query';
import { Metadata } from 'next';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { getPersons } from '@/services/api';

import Content from './_components/Content';

import './_styles/index.css';

export const metadata: Metadata = {
    title: 'Persons',
};

type Props = {
    searchParams: Promise<{
        page?: string;
    }>
};

export default async function Page(props: Props) {
    const searchParams = await props.searchParams;
    const currentPage = Number(searchParams.page) || 1;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['persons', currentPage],
        queryFn: () => getPersons(currentPage),
    });

    return (
        <Container className='p-persons'>
            <Title className='font-bold uppercase text-center'>
                Persons
            </Title>

            <HydrationBoundary state={dehydrate(queryClient)}>
                <Content currentPage={currentPage} />
            </HydrationBoundary>
        </Container>
    );
}