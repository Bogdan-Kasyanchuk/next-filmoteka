import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

import generateMetaTags from '@/helpers/generateMetaTags';
import { personsQueryKeys } from '@/helpers/queryKeys';
import { pagesPersonUrl } from '@/routes';
import { getPersonById } from '@/services/tmdb/persons';

import Content from './components/Content';

import './styles/index.css';

type Props = {
    params: Promise<{ id: string }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const locale = await getLocale();
        
    const params = await props.params;
        
    const data = await getPersonById(params.id, locale);

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
    const locale = await getLocale();
        
    const params = await props.params;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: personsQueryKeys.personById(params.id, locale),
        queryFn: () => getPersonById(params.id, locale)
    });

    return (
        <HydrationBoundary state={ dehydrate(queryClient) }>
            <Content id={ params.id } />
        </HydrationBoundary>
    );
}