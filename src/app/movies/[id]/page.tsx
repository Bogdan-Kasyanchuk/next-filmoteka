import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import { getMovieById } from '@/services/api';
import { MovieDetailsShema } from '@/shemas';

import Content from './components/Content';

import './styles/index.css';

type Props = {
    params: Promise<{ id: string }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
        
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [ 'movies', params.id ],
        queryFn: () => getMovieById(params.id)
    });

    const data = queryClient.getQueryData<MovieDetailsShema>([ 'movies', params.id ]);

    return {
        title: data?.title || data?.original_title || 'Movie'
    };
}

export default async function Page(props: Props) {
    const params = await props.params;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [ 'movies', params.id ],
        queryFn: () => getMovieById(params.id)
    });

    return (
        <HydrationBoundary state={ dehydrate(queryClient) }>
            <Content id={ params.id } />
        </HydrationBoundary>
    );
}