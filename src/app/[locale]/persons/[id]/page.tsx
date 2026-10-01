import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { Locale } from 'next-intl';
import { getExtracted, setRequestLocale } from 'next-intl/server';

import { personsQueryKeys } from '@/helpers/queryKeys';
import { pagesPersonUrl } from '@/routes';
import { getPersonById } from '@/services/tmdb/persons';
import generateMetaTags from '@/utils/generateMetaTags';
import withNotFound from '@/utils/withNotFound';

import Content from './components/Content';

import './styles/index.css';

type Props = {
    params: Promise<{ locale: Locale, id: string }>
};

// rendered on first request, then served from the cache and revalidated with the data
export function generateStaticParams() {
    return [];
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const { locale } = params;

    const t = await getExtracted({ locale });
        
    const data = await withNotFound(getPersonById(params.id, locale));

    return generateMetaTags(
        {
            title: data.name,
            description: t('Detailed information about {title}. Photo gallery, acting and producing career.', { title: data.name }),
            path: pagesPersonUrl(params.id),
            locale
        }
    );
}

export default async function Page(props: Props) {
    const params = await props.params;
    const { locale } = params;

    setRequestLocale(locale);

    const queryClient = new QueryClient();

    await withNotFound(queryClient.fetchQuery({
        queryKey: personsQueryKeys.personById(params.id, locale),
        queryFn: () => getPersonById(params.id, locale)
    }));

    return (
        <HydrationBoundary state={ dehydrate(queryClient) }>
            <Content id={ params.id } />
        </HydrationBoundary>
    );
}