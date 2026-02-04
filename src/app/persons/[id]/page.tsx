import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import generateMetaTags from '@/helpers/generateMetaTags';
import { pagesPersonUrl } from '@/routes';
import { getPersonById } from '@/services/tmdbApi/persons';

import Content from './components/Content';

import './styles/index.css';

type Props = {
    params: Promise<{ id: string }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
        
    const data = await getPersonById(params.id);

    return generateMetaTags(
        {
            title: data.name,
            description: `Detailed information about ${ data.name }. Her photo gallery, acting and producing career.`,
            keywords: [
                data.name,
                `biography of ${ data.name }`,
                `${ data.name } photo gallery`,
                `${ data.name } acting`,
                `${ data.name } producing`
            ],
            url: pagesPersonUrl(params.id)
        }
    );
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