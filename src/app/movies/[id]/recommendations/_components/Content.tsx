'use client';

import { keepPreviousData, useQueries } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import CurrentMovie from '@/components/app/CurrentMovie';
import Pagination from '@/components/app/Pagination';
import MovieCard from '@/components/ui/cards/MovieCard';
import FailedLoadData from '@/components/ui/data-display/FailedLoadData';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { transformCurrentMovie, transformMovie } from '@/helpers/transformData';
import { getCurrentMovieById, getRecommendationsMovies } from '@/services/api';

type Props = {
    id: string,
    currentPage: number
};

export default function Content(props: Props) {
    const data = useQueries({
        queries: [
            {
                queryKey: [ 'movies', 'current', props.id ],
                queryFn: () => getCurrentMovieById(props.id)
            },
            {
                queryKey: [ 'movies', props.id, 'recommendations', props.currentPage ],
                queryFn: () => getRecommendationsMovies(props.id, props.currentPage),
                placeholderData: keepPreviousData
            }
        ],
        combine: results => {
            let error = { 
                isError: false,
                message: ''
            };

            results.forEach(result => {
                if (result.isError) {
                    error = {
                        isError: result.isError,
                        message: result.error.message
                    };
                }
            });

            return {
                movie: results[ 0 ].data && transformCurrentMovie(results[ 0 ].data),
                recommendations: {
                    movies: results[ 1 ].data?.results.map(transformMovie) ?? [],
                    total_pages: results[ 1 ].data?.total_pages ?? 0
                },
                isPending: results.some(result => result.isPending),
                error
            };
        }
    });

    if (data.isPending) {
        return <Loader />;
    }

    if (data.error.isError) {
        return (
            <FailedLoadData>{ data.error.message }</FailedLoadData>
        );
    }

    if (!data.movie || !data.recommendations.movies.length) {
        return notFound();
    }

    return (
        <Container className="p-movie-recommendations">
            <CurrentMovie
                movie={ data.movie }
                id={ props.id }
            />

            <Title className="p-movie-recommendations__title">
                Recommendations
            </Title>

            <div className="p-movie-recommendations__content">
                <ul className="p-movie-recommendations__list">
                    {
                        data.recommendations.movies.map(
                            movie => (
                                <li key={ movie.id }>
                                    <MovieCard movie={ movie } />
                                </li>
                            )
                        )
                    }
                </ul>

                {
                    data.recommendations.total_pages > 1 &&
                    <Pagination
                        currentPage={ props.currentPage }
                        totalPages={ data.recommendations.total_pages }
                    />
                }
            </div>
        </Container>
    );
}