'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Suspense } from 'react';

import Cast from '@/components/app/Cast';
import Crew from '@/components/app/Crew';
import { RecommendationsSkeleton } from '@/components/app/Recommendations';
import Reviews, { ReviewsSkeleton } from '@/components/app/Reviews';
import Videos, { VideosSkeleton } from '@/components/app/Videos';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import { MediaType } from '@/enums';
import { moviesQueryKeys } from '@/helpers/queryKeys';
import { transformMovieDetails } from '@/helpers/transformData';
import { getMovieById } from '@/services/tmdb/movies';

import MovieDetails from './MovieDetails';
import Recommendations from './Recommendations';

type Props = {
    id: string
};

export default function Content(props: Props) {
    const locale = useLocale();
        
    const { data, isPending, isError } = useQuery({
        queryKey: moviesQueryKeys.movieById(props.id, locale),
        queryFn: () => getMovieById(props.id, locale),
        select: data => transformMovieDetails(data)
    });

    if (isPending) {
        return <Loader />;
    }

    if (isError || !data) {
        notFound();
    }

    return (
        <div className="p-movie">
            <MovieDetails
                movie={ data.movie }
                id={ props.id }
            />

            <Container className="p-movie__container">
                {
                    data.cast.length > 0 &&
                    <Cast cast={ data.cast } />
                }

                {
                    data.crew.length > 0 &&
                    <Crew crew={ data.crew } />
                }

                <Suspense fallback={ <VideosSkeleton /> }>
                    <Videos
                        type={ MediaType.MOVIE }
                        id={ props.id }
                    />
                </Suspense>
                
                <Suspense fallback={ <RecommendationsSkeleton /> }>
                    <Recommendations id={ props.id } />
                </Suspense>
                
                <Suspense fallback={ <ReviewsSkeleton /> }>
                    <Reviews
                        type={ MediaType.MOVIE }
                        id={ props.id }
                    />
                </Suspense>
            </Container>
        </div>
    );
}