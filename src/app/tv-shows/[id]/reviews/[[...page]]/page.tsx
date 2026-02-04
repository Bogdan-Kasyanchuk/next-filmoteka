import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { MediaType } from '@/enums';
import generateMetaTags from '@/helpers/generateMetaTags';
import { reviewsUrl } from '@/routes';
import { getCurrentTVShowById, getReviewsToTVShow } from '@/services/tmdbApi/tvShows';
import isInvalidPage from '@/utils/isInvalidPage';

import Content from './components/Content';

import './styles/index.css';

type Props = {
    params: Promise<{
        id: string,
        page?: string[]
    }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
        
    const data = await getCurrentTVShowById(params.id);

    const title = data.name || data.original_name;

    return generateMetaTags(
        {
            title: `${ title } | Reviews`,
            description: `Reviews of the ${ title }.`,
            keywords: [ title, `reviews to ${ title }` ],
            url: reviewsUrl(MediaType.TV_SHOW, params.id)
        }
    );
}

export default async function Page(props: Props) {
    const params = await props.params;

    const page = params.page ? Number(params.page[ 1 ]) : 1;

    if (params.page && isInvalidPage( params.page[ 0 ], page)) {
        notFound();
    }

    const queryClient = new QueryClient();

    await Promise.all([
        await queryClient.prefetchQuery(
            {
                queryKey: [ 'tv-shows', params.id, 'reviews' ],
                queryFn: () => getCurrentTVShowById(params.id)
            }
        ),
        await queryClient.prefetchQuery(
            {
                queryKey: [ 'tv-shows', params.id, 'reviews', page ],
                queryFn: () => getReviewsToTVShow(params.id, page)
            }
        )
    ]);

    return (
        <HydrationBoundary state={ dehydrate(queryClient) }>
            <Content
                id={ params.id }
                page={ page }
            />
        </HydrationBoundary>
    );
}