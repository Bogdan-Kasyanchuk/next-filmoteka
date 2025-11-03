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
import { getCurrentMovieById, getSimilarMovies } from '@/services/api';

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
                queryKey: [ 'movies', props.id, 'similar', props.currentPage ],
                queryFn: () => getSimilarMovies(props.id, props.currentPage),
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
                similar: {
                    movies: results[ 1 ].data?.results.map(transformMovie) ?? [],
                    total_pages: results[ 1 ].data?.total_pages ?? 0
                },
                pending: results.some(result => result.isPending),
                error
            };
        }
    });

    if (data.pending) {
        return <Loader />;
    }

    if (data.error.isError) {
        return (
            <FailedLoadData>{ data.error.message } </FailedLoadData>
        );
    }

    if (!data.movie || !data.similar.movies.length) {
        return notFound();
    }

    return (
        <Container className="p-movie-similar">
            <CurrentMovie
                movie={ data.movie }
                id={ props.id }
            />

            <Title className="p-movie-similar__title">
                Similar
            </Title>

            <div className="p-movie-similar__content">
                <ul className="p-movie-similar__list">
                    {
                        data.similar.movies.map(
                            movie => (
                                <li key={ movie.id }>
                                    <MovieCard movie={ movie } />
                                </li>
                            )
                        )
                    }
                </ul>

                {
                    data.similar.total_pages > 1 &&
                    <Pagination
                        currentPage={ props.currentPage }
                        totalPages={ data.similar.total_pages }
                    />
                }
            </div>
        </Container>
    );
}