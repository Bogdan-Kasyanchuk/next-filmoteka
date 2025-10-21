import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import { getPersonById } from '@/services/api';
import { PersonDetailsShema } from '@/shemas';

import Content from './_components/Content';

import './_styles/index.css';

type Props = {
    params: Promise<{ id: string }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
        
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [ 'persons', params.id ],
        queryFn: () => getPersonById(params.id)
    });

    const data = queryClient.getQueryData<PersonDetailsShema>([ 'persons', params.id ]);

    return {
        title: data?.name || 'Person'
    };
}

export default async function Page(props: Props) {
    const params = await props.params;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [ 'persons', params.id ],
        queryFn: () => getPersonById(params.id)
    });

    return (
        <HydrationBoundary state={ dehydrate(queryClient) }>
            <Content id={ params.id } />
        </HydrationBoundary>
    );
}