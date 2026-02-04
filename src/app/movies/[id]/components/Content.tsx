'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import Cast from '@/components/app/Cast';
import Crew from '@/components/app/Crew';
import Recommendations from '@/components/app/Recommendations';
import MovieCard from '@/components/ui/cards/MovieCard';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import { MediaType } from '@/enums';
import { transformMovieDetails } from '@/helpers/transformData';
import { recommendationsUrl } from '@/routes';
import { getMovieById } from '@/services/tmdbApi/movies';
import { MovieMapper } from '@/types';

import MovieDetails from './MovieDetails';

type Props = {
    id: string
};

export default function Content(props: Props) {
    const { data, isPending, isError } = useQuery({
        queryKey: [ 'movies', props.id ],
        queryFn: () => getMovieById(props.id),
        select: data => transformMovieDetails(data)
    });

    if (isPending) {
        return <Loader />;
    }

    if (isError || !data) {
        notFound();
    }

    return (
        <>
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
                    data.recommendations.items.length > 0 &&
                    <Recommendations<MovieMapper>
                        recommendations={ data.recommendations }
                        item={ item => <MovieCard movie={ item } /> }
                        showAllPath={ recommendationsUrl(MediaType.MOVIE, props.id) }
                    />
                }
            </Container>
        </>
    );
}