import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { MediaType } from '@/enums';
import generateMetaTags from '@/helpers/generateMetaTags';
import { getCurrentMovieByIdCached } from '@/lib/cachedWrappers';
import { reviewsUrl } from '@/routes';
import { getReviewsToMovie } from '@/services/api';
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
        
    const data = await getCurrentMovieByIdCached(params.id);

    const title = data.title || data.original_title;

    return generateMetaTags(
        {
            title: `${ title } | Reviews`,
            description: `Reviews of the ${ title }.`,
            keywords: [ title, `reviews to ${ title }` ],
            url: reviewsUrl(MediaType.MOVIE, params.id)
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
                queryKey: [ 'movies', 'current', params.id ],
                queryFn: () => getCurrentMovieByIdCached(params.id)
            }
        ),
        await queryClient.prefetchQuery(
            {
                queryKey: [ 'movies', params.id, 'reviews', page ],
                queryFn: () => getReviewsToMovie(params.id, page)
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