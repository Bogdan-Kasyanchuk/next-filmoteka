import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { getExtracted, getLocale } from 'next-intl/server';

import generateMetaTags from '@/helpers/generateMetaTags';
import { tvShowsQueryKeys } from '@/helpers/queryKeys';
import { pagesTVShowUrl } from '@/routes';
import { getTVShowById } from '@/services/tmdb/tvShows';

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

    const data = await getTVShowById(params.id, locale);

    const title = data.name || data.original_name;

    return generateMetaTags(
        {
            title,
            description: t('Detailed information about the tv show {title}. Its overview, cast, crew, seasons, videos, reviews. Recommended tv shows.', { title }),
            keywords: [
                title,
                t('cast of {title}', { title }),
                t('crew of {title}', { title }),
                t('seasons of {title}', { title }),
                t('videos of {title}', { title }),
                t('reviews of {title}', { title }),
                t('recommended tv shows for {title}', { title })
            ],
            url: `/${ locale }/${ pagesTVShowUrl(params.id) }`,
            languages: {
                en: `/en/${ pagesTVShowUrl(params.id) }`,
                uk: `/uk/${ pagesTVShowUrl(params.id) }`
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
        queryKey: tvShowsQueryKeys.tvShowById(params.id, locale),
        queryFn: () => getTVShowById(params.id, locale)
    });

    return (
        <HydrationBoundary state={ dehydrate(queryClient) }>
            <Content id={ params.id } />
        </HydrationBoundary>
    );
}