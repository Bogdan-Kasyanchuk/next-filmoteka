import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { Suspense } from 'react';

import Reviews from '@/components/app/Reviews';
import Videos from '@/components/app/Videos';
import Container from '@/components/ui/layouts/Container';
import { MediaType } from '@/enums';
import generateMetaTags from '@/helpers/generateMetaTags';
import { pagesMovieUrl } from '@/routes';
import { getMovieById } from '@/services/tmdbApi/movies';

import Content from './components/Content';
import Recommendations from './components/Recommendations';

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
            description: `Detailed information about the movie ${ title }. Its overview, cast, crew, videos, reviews. Recommended movies`,
            keywords: [
                title,
                `cast of ${ title }`,
                `crew of ${ title }`,
                `videos of ${ title }`,
                `reviews of ${ title }`,
                `recommended of ${ title }`
            ],
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
                <Videos
                    type={ MediaType.MOVIE }
                    id={ params.id }
                />
            </Suspense>

            <Suspense
                fallback={
                    <Container className="xxl:max-w-[1440px]">
                        <div className="text-5xl">Loading recommendations...</div>
                    </Container> 
                }
            >
                <Recommendations id={ params.id } />
            </Suspense>

            <Suspense
                fallback={
                    <Container className="xxl:max-w-[1440px]">
                        <div className="text-5xl">Loading reviews...</div>
                    </Container> 
                }
            >
                <Reviews
                    type={ MediaType.MOVIE }
                    id={ params.id }
                />
            </Suspense>
        </div>
    );
}