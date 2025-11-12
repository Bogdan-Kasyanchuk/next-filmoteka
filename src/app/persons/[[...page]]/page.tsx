import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { getPersons } from '@/services/api';

import Content from './components/Content';

import './styles/index.css';

type Props = {
    params: Promise<{ page?: string[] }>
};

export const metadata: Metadata = {
    title: 'Persons'
};

export default async function Page(props: Props) {
    const params = await props.params;
    
    const page = params.page ? Number(params.page[ 1 ]) : 1;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [ 'persons', page ],
        queryFn: () => getPersons(page)
    });

    return (
        <Container className="p-persons">
            <Title className="p-persons__title">
                Persons
            </Title>

            <HydrationBoundary state={ dehydrate(queryClient) }>
                <Content page={ page } />
            </HydrationBoundary>
        </Container>
    );
}