'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import Cast from '@/components/app/Cast';
import Crew from '@/components/app/Crew';
import Recommendations from '@/components/app/Recommendations';
import Reviews from '@/components/app/Reviews';
import Videos from '@/components/app/Videos';
import MovieCard from '@/components/ui/cards/MovieCard';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import { MediaType } from '@/enums';
import { transformMovieDetails } from '@/helpers/transformData';
import { recommendationsUrl, reviewsUrl } from '@/routes';
import { getMovieByIdCached } from '@/services/cachedWrappers';
import { MovieMapper } from '@/types';

import MovieDetails from './MovieDetails';

type Props = {
    id: string
};

export default function Content(props: Props) {
    const { data, isPending, isError } = useQuery({
        queryKey: [ 'movies', props.id ],
        queryFn: () => getMovieByIdCached(props.id),
        select: data => transformMovieDetails(data)
    });

    if (isPending) {
        return <Loader />;
    }

    if (isError || !data) {
        return notFound();
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

                {
                    data.videos.length > 0 &&
                    <Videos videos={ data.videos } />
                }

                {
                    data.recommendations.items.length > 0 &&
                    <Recommendations<MovieMapper>
                        recommendations={ data.recommendations }
                        item={ item => <MovieCard movie={ item } /> }
                        showAllPath={ recommendationsUrl(MediaType.MOVIE, props.id) }
                    />
                }

                {
                    data.reviews.items.length > 0 &&
                    <Reviews
                        reviews={ data.reviews }
                        showAllPath={ reviewsUrl(MediaType.MOVIE, props.id) }
                    />
                }
            </Container>
        </div>
    );
}