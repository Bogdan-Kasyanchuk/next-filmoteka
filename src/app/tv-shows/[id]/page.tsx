import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import generateMetaTags from '@/helpers/generateMetaTags';
import { pagesTVShowUrl } from '@/routes';
import { getTVShowById } from '@/services/tmdbApi/tvShows';

import Content from './components/Content';

import './styles/index.css';

type Props = {
    params: Promise<{ id: string }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
        
    const data = await getTVShowById(params.id);

    const title = data.name || data.original_name;

    return generateMetaTags(
        {
            title,
            description: `${ title }. Details, overview, creators, networks, cast, crew, seasons, recommendations and reviews.`,
            keywords: [ title, `cast of ${ title }`, `crew of ${ title }`, `seasons of ${ title }`, `reviews of ${ title }` ],
            url: pagesTVShowUrl(params.id)
        }
    );
}

export default async function Page(props: Props) {
    const params = await props.params;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [ 'tv-shows', params.id ],
        queryFn: () => getTVShowById(params.id)
    });

    return (
        <HydrationBoundary state={ dehydrate(queryClient) }>
            <Content id={ params.id } />
        </HydrationBoundary>
    );
}