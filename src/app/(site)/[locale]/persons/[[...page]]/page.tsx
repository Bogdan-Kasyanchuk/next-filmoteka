import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getExtracted, getLocale } from 'next-intl/server';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import generateMetaTags from '@/helpers/generateMetaTags';
import { personsQueryKeys } from '@/helpers/queryKeys';
import { pagesPersonsUrl } from '@/routes';
import { getPersons } from '@/services/tmdb/persons';
import isInvalidPage from '@/utils/isInvalidPage';
import normalizePage from '@/utils/normalizePage';

import Content from './components/Content';

import './styles/index.css';

type Props = {
    params: Promise<{ page?: string[] }>
};

export const metadata: Metadata = generateMetaTags(
    {
        title: 'Persons',
        description: 'Actors, film crew members of films and tv shows.',
        keywords: [ 'persons', 'actors', 'film crew members' ],
        url: pagesPersonsUrl()
    }
);

export default async function Page(props: Props) {
    const [ locale, params ] = await Promise.all([
        getLocale(),
        props.params
    ]);

    const t = await getExtracted();

    const page = params.page ? normalizePage(params.page[ 1 ]) : 1;

    if (params.page && isInvalidPage( params.page[ 0 ], page)) {
        notFound();
    }

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: personsQueryKeys.allPersons(page, locale),
        queryFn: () => getPersons(page, locale)
    });

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