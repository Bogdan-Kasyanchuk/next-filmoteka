import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { getPersons } from '@/services/api';

import Content from './_components/Content';

import './_styles/index.css';

type Props = {
    searchParams: Promise<{
        page?: string
    }>
};

export const metadata: Metadata = {
    title: 'Persons'
};

export default async function Page(props: Props) {
    const searchParams = await props.searchParams;
    
    const currentPage = Number(searchParams.page ?? 1);

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [ 'persons', currentPage ],
        queryFn: () => getPersons(currentPage)
    });

    return (
        <Container className="p-persons">
            <Title className="p-persons__title">
                Persons
            </Title>

            <HydrationBoundary state={ dehydrate(queryClient) }>
                <Content currentPage={ currentPage } />
            </HydrationBoundary>
        </Container>
    );
}