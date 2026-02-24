import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { getExtracted, getLocale } from 'next-intl/server';

import { personsQueryKeys } from '@/helpers/queryKeys';
import { pagesPersonUrl } from '@/routes';
import { getPersonById } from '@/services/tmdb/persons';
import generateMetaTags from '@/utils/generateMetaTags';

import Content from './components/Content';

import './styles/index.css';

type Props = {
    params: Promise<{ id: string }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const [ locale, params ] = await Promise.all([
        getLocale(),
        props.params
    ]);

    const t = await getExtracted();
        
    const data = await getPersonById(params.id, locale);

    return generateMetaTags(
        {
            title: data.name,
            description: t('Detailed information about {title}. Photo gallery, acting and producing career.', { title: data.name }),
            keywords: [
                data.name,
                t('biography of {title}', { title: data.name }),
                t('photo gallery of {title}', { title: data.name }),
                t('acting of {title}', { title: data.name }),
                t('producing of {title}', { title: data.name })
            ],
            url: `/${ locale }/${ pagesPersonUrl(params.id) }`,
            languages: {
                en: `/en/${ pagesPersonUrl(params.id) }`,
                uk: `/uk/${ pagesPersonUrl(params.id) }`
            }
        }
    );
}

export default async function Page(props: Props) {
    const [ locale, params ] = await Promise.all([
        getLocale(),
        props.params
    ]);

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