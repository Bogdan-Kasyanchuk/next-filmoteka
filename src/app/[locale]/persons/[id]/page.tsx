import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import generateMeta from '@/helpers/generateMeta';
import { pagesPersonUrl } from '@/routes';
import { getPersonByIdCached } from '@/services/cachedWrappers';

import Content from './components/Content';

import './styles/index.css';

type Props = {
    params: Promise<{ id: string }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
        
    const data = await getPersonByIdCached(params.id);

    return generateMeta(
        {
            title: data.name,
            description: `${ data.name }. Details, biography, photos, timeline`,
            keywords: [ data.name, `biography of ${ data.name }`, `photos of ${ data.name }`, `timeline of ${ data.name }` ],
            url: pagesPersonUrl(params.id)
        }
    );
}

export default async function Page(props: Props) {
    const params = await props.params;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [ 'persons', params.id ],
        queryFn: () => getPersonByIdCached(params.id)
    });

    return (
        <HydrationBoundary state={ dehydrate(queryClient) }>
            <Content id={ params.id } />
        </HydrationBoundary>
    );
}