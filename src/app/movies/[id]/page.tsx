import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { Suspense } from 'react';

import Container from '@/components/ui/layouts/Container';
import generateMetaTags from '@/helpers/generateMetaTags';
import { pagesMovieUrl } from '@/routes';
import { getMovieById } from '@/services/tmdbApi/movies';

import Content from './components/Content';
import Reviews from './components/Reviews';
import Videos from './components/Videos';

import './styles/index.css';

type Props = {
    params: Promise<{ id: string }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
        
    const data = await getMovieById(params.id);

    const title = data.title || data.original_title;

    return generateMetaTags(
        {
            title,
            description: `${ title }. Details, overview, production companies, cast, crew, videos, recommendations, reviews`,
            keywords: [ title, `cast of ${ title }`, `crew of ${ title }`, `videos of ${ title }`, `reviews of ${ title }` ],
            url: pagesMovieUrl(params.id)
        }
    );
}

export default async function Page(props: Props) {
    const params = await props.params;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [ 'movies', params.id ],
        queryFn: () => getMovieById(params.id)
    });

    return (
        <div className="p-movie">
            <HydrationBoundary state={ dehydrate(queryClient) }>
                <Content id={ params.id } />
            </HydrationBoundary>

            <Suspense
                fallback={
                    <Container className="xxl:max-w-[1440px]">
                        <div className="text-5xl">Loading videos...</div>
                    </Container> 
                }
            >
                <Videos id={ params.id } />
            </Suspense>

            <Suspense
                fallback={
                    <Container className="xxl:max-w-[1440px]">
                        <div className="text-5xl">Loading reviews...</div>
                    </Container> 
                }
            >
                <Reviews id={ params.id } />
            </Suspense>
        </div>
    );
}