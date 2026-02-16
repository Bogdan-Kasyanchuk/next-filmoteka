import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { getLocale } from 'next-intl/server';

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
        
    const data = await getTVShowById(params.id, locale);

    const title = data.name || data.original_name;

    return generateMetaTags(
        {
            title,
            description: `Detailed information about the tv show ${ title }. Its overview, cast, crew, seasons, videos, reviews. Recommended tv shows.`,
            keywords: [
                title,
                `cast of ${ title }`,
                `crew of ${ title }`,
                `seasons of ${ title }`,
                `videos of ${ title }`,
                `reviews of ${ title }`,
                `recommended of ${ title }`
            ],
            url: pagesTVShowUrl(params.id)
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