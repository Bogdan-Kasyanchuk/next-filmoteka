import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getExtracted, getLocale } from 'next-intl/server';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { TVShowType } from '@/enums';
import generateMetaTags from '@/helpers/generateMetaTags';
import { tvShowsQueryKeys } from '@/helpers/queryKeys';
import { pagesTVShowsUrl } from '@/routes';
import { getTVShows } from '@/services/tmdb/tvShows';
import isInvalidPage from '@/utils/isInvalidPage';
import normalizePage from '@/utils/normalizePage';

import Content from './components/Content';
import Filter from './components/Filter';
import TitleText from './components/TitleText';

import './styles/index.css';

type Props = {
    params: Promise<{ page?: string[] }>,
    searchParams: Promise<{
        type?: TVShowType
    }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const [ locale, searchParams ] = await Promise.all([
        getLocale(),
        props.searchParams
    ]);

    const t = await getExtracted();

    const type = searchParams.type || TVShowType.AIRING_TODAY;

    const normalizedType = type === TVShowType.AIRING_TODAY
        ? t('Airing today')
        : type === TVShowType.ON_THE_AIR
            ? t('On the air')
            : type === TVShowType.POPULAR
                ? t('Popular')
                : t('Top rated');
  
    return generateMetaTags(
        {
            title: `${ t('TV Shows') } | ${ normalizedType }`,
            description: t('Airing today, on the air, popular and top rated tv shows.'),
            keywords: [
                t('airing today tv shows'),
                t('on the air tv shows'),
                t('popular tv shows'),
                t('top rated tv shows'),
                t('tv shows')
            ],
            url: `/${ locale }/${ pagesTVShowsUrl() }`,
            languages: {
                en: `/en/${ pagesTVShowsUrl() }`,
                uk: `/uk/${ pagesTVShowsUrl() }`
            }
        }
    );
}

export default async function Page(props: Props) {
    const [ locale, params, searchParams ] = await Promise.all([
        getLocale(),
        props.params,
        props.searchParams
    ]);

    const type = searchParams.type || TVShowType.AIRING_TODAY;
    const page = params.page ? normalizePage(params.page[ 1 ]) : 1;

    if (params.page && isInvalidPage( params.page[ 0 ], page)) {
        notFound();
    }

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: tvShowsQueryKeys.alltvShows(type, page, locale),
        queryFn: () => getTVShows(type, page, locale)
    });

    return (
        <Container className="p-tv-shows">
            <Filter type={ type } />

            <Title className="p-tv-shows__title">
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