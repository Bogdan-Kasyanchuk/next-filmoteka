import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocale } from 'next-intl/server';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { MovieType } from '@/enums';
import generateMetaTags from '@/helpers/generateMetaTags';
import { moviesQueryKeys } from '@/helpers/queryKeys';
import { pagesMoviesUrl } from '@/routes';
import { getMovies } from '@/services/tmdb/movies';
import isInvalidPage from '@/utils/isInvalidPage';
import normalizePage from '@/utils/normalizePage';

import Content from './components/Content';
import Filter from './components/Filter';
import TitleText from './components/TitleText';

import './styles/index.css';

type Props = {
    params: Promise<{ page?: string[] }>,
    searchParams: Promise<{
        type?: MovieType
    }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const searchParams = await props.searchParams;

    const type = searchParams.type || MovieType.NOW_PLAYING;

    const normalizedType = type === MovieType.NOW_PLAYING
        ? 'Now playing'
        : type === MovieType.POPULAR
            ? 'Popular'
            : type === MovieType.TOP_RATED
                ? 'Top rated'
                : 'Upcoming';
 
    return generateMetaTags(
        {
            title: `Movies | ${ normalizedType }`,
            description: 'Now playing, popular, top rated and upcoming movies.',
            keywords: [
                'now playing movies',
                'popular movies',
                'top rated movies',
                'upcoming movies',
                'movies'
            ],
            url: pagesMoviesUrl()
        }
    );
}

export default async function Page(props: Props) {
    const [ locale, params, searchParams ] = await Promise.all([
        getLocale(),
        props.params,
        props.searchParams
    ]);

    const type = searchParams.type || MovieType.NOW_PLAYING;
    const page = params.page ? normalizePage(params.page[ 1 ]) : 1;

    if (params.page && isInvalidPage( params.page[ 0 ], page)) {
        notFound();
    }

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: moviesQueryKeys.allMovies(type, page, locale),
        queryFn: () => getMovies(type, page, locale)
    });

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