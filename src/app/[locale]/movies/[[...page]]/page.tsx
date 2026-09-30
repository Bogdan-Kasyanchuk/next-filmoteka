import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Locale } from 'next-intl';
import { getExtracted, setRequestLocale } from 'next-intl/server';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { MovieType } from '@/enums';
import { moviesQueryKeys } from '@/helpers/queryKeys';
import { pagesMoviesUrl } from '@/routes';
import { getMovies } from '@/services/tmdb/movies';
import generateMetaTags from '@/utils/generateMetaTags';
import isInvalidPage from '@/utils/isInvalidPage';
import normalizePage from '@/utils/normalizePage';
import withNotFound from '@/utils/withNotFound';

import Content from './components/Content';
import Filter from './components/Filter';
import TitleText from './components/TitleText';

import './styles/index.css';

type Props = {
    params: Promise<{ locale: Locale, page?: string[] }>,
    searchParams: Promise<{
        type?: MovieType
    }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const [ { locale }, searchParams ] = await Promise.all([
        props.params,
        props.searchParams
    ]);

    const t = await getExtracted({ locale });

    const type = searchParams.type || MovieType.NOW_PLAYING;

    const normalizedType = type === MovieType.NOW_PLAYING
        ? t('Now playing')
        : type === MovieType.POPULAR
            ? t('Popular')
            : type === MovieType.TOP_RATED
                ? t('Top rated')
                : t('Upcoming');
 
    return generateMetaTags(
        {
            title: `${ t('Movies') } | ${ normalizedType }`,
            description: t('Now playing, popular, top rated and upcoming movies.'),
            path: pagesMoviesUrl(),
            locale
        }
    );
}

export default async function Page(props: Props) {
    const [ params, searchParams ] = await Promise.all([
        props.params,
        props.searchParams
    ]);
    const { locale } = params;

    setRequestLocale(locale);

    const type = searchParams.type || MovieType.NOW_PLAYING;
    const page = params.page ? normalizePage(params.page[ 1 ]) : 1;

    if (params.page && isInvalidPage(params.page)) {
        notFound();
    }

    const queryClient = new QueryClient();

    const data = await withNotFound(queryClient.fetchQuery({
        queryKey: moviesQueryKeys.allMovies(type, page, locale),
        queryFn: () => getMovies(type, page, locale)
    }));

    if (!data.results.length) {
        notFound();
    }

    return (
        <Container className="p-movies">
            <Filter type={ type } />

            <Title className="p-movies__title">
                <TitleText type={ type } />
            </Title>

            <HydrationBoundary state={ dehydrate(queryClient) }>
                <Content
                    type={ type }
                    page={ page }
                />
            </HydrationBoundary>
        </Container>
    );
}