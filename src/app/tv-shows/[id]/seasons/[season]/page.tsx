import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import generateMetaTags from '@/helpers/generateMetaTags';
import { pagesSeasonUrl } from '@/routes';
import { getTVShowSeasonByNumber } from '@/services/api';
import { getCurrentTVShowByIdCached } from '@/services/cachedWrappers';

import Content from './components/Content';

import './styles/index.css';

type Props = {
    params: Promise<{
        id: string,
        season: string
    }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;

    const data = await getCurrentTVShowByIdCached(params.id);

    const title = data.name || data.original_name;

    return generateMetaTags(
        {
            title: `${ title } | Season ${ params.season }`,
            description: `${ title }. Season ${ params.season }. Details, episodes. Details of episodes.`,
            keywords: [ title, `season of ${ title }`, `episodes of ${ title }` ],
            url: pagesSeasonUrl(params.id, Number(params.season)),
            index: false,
            follow: false
        }
    );
}

export default async function Page(props: Props) {
    const params = await props.params;

    const season = Number(params.season);

    const queryClient = new QueryClient();

    await Promise.all([
        await queryClient.prefetchQuery(
            {
                queryKey: [ 'tv-shows', 'current', params.id ],
                queryFn: () => getCurrentTVShowByIdCached(params.id)
            }
        ),
        await queryClient.prefetchQuery(
            {
                queryKey: [ 'tv-shows', params.id, season ],
                queryFn: () => getTVShowSeasonByNumber(params.id, season)
            }
        )
    ]);

    return (
        <HydrationBoundary state={ dehydrate(queryClient) }>
            <Content
                id={ params.id }
                season={ season }
            />
        </HydrationBoundary>
    );
}