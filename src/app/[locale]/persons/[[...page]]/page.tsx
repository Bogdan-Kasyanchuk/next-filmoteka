import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale } from 'next-intl';
import { getExtracted, setRequestLocale } from 'next-intl/server';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { personsQueryKeys } from '@/helpers/queryKeys';
import { pagesPersonsUrl } from '@/routes';
import { getPersons } from '@/services/tmdb/persons';
import generateMetaTags from '@/utils/generateMetaTags';
import isInvalidPage from '@/utils/isInvalidPage';
import normalizePage from '@/utils/normalizePage';
import withNotFound from '@/utils/withNotFound';

import Content from './components/Content';

import './styles/index.css';

// rendered on first request, then served from the cache and revalidated with the data
export function generateStaticParams() {
    return [];
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { locale } = await props.params;

    const t = await getExtracted({ locale });

    return generateMetaTags(
        {
            title: t('Persons'),
            description: t('Actors, film crew members of films and tv shows.'),
            path: pagesPersonsUrl(),
            locale
        }
    );
}

type Props = {
    params: Promise<{ locale: Locale, page?: string[] }>
};

export default async function Page(props: Props) {
    const params = await props.params;
    const { locale } = params;

    setRequestLocale(locale);

    const t = await getExtracted({ locale });

    const page = params.page ? normalizePage(params.page[ 1 ]) : 1;

    if (params.page && isInvalidPage(params.page)) {
        notFound();
    }

    const queryClient = new QueryClient();

    const data = await withNotFound(queryClient.fetchQuery({
        queryKey: personsQueryKeys.allPersons(page, locale),
        queryFn: () => getPersons(page, locale)
    }));

    if (!data.results.length) {
        notFound();
    }

    return (
        <Container className="p-persons">
            <Title className="p-persons__title">
                { t('Persons') }
            </Title>

            <HydrationBoundary state={ dehydrate(queryClient) }>
                <Content page={ page } />
            </HydrationBoundary>
        </Container>
    );
}