import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import { getCurrentTVShowById, getReviewsToTVShow } from '@/services/api';
import { CurrentTVShowShema } from '@/shemas';

import Content from './_components/Content';

import './_styles/index.css';

type Props = {
    params: Promise<{ id: string }>,
    searchParams: Promise<{ page?: string }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
        
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [ 'tv-shows', 'current', params.id ],
        queryFn: () => getCurrentTVShowById(params.id)
    });

    const data = queryClient.getQueryData<CurrentTVShowShema>([ 'movies', 'current', params.id ]);

    const title = data?.name || data?.original_name || 'TV Show';

    return {
        title: `${ title } | Reviews`
    };
}

export default async function Page(props: Props) {
    const params = await props.params;

    const searchParams = await props.searchParams;
    const currentPage = Number(searchParams.page ?? 1);

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
                queryKey: [ 'tv-shows', params.id, 'reviews', currentPage ],
                queryFn: () => getReviewsToTVShow(params.id, currentPage)
            }
        )
    ]);

    return (
        <HydrationBoundary state={ dehydrate(queryClient) }>
            <Content
                id={ params.id }
                currentPage={ currentPage }
            />
        </HydrationBoundary>
    );
}