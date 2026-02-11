'use client';

import { keepPreviousData, useQueries } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import CurrentMovie from '@/components/app/CurrentMovie';
import Pagination from '@/components/app/Pagination';
import MovieCard from '@/components/ui/cards/MovieCard';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { transformCurrentMovie, transformMovie } from '@/helpers/transformData';
import { getCurrentMovieById, getSimilarMovies } from '@/services/tmdbApi/movies';

type Props = {
    id: string,
    page: number
};

export default function Content(props: Props) {
    const data = useQueries({
        queries: [
            {
                queryKey: [ 'movies', 'current', props.id ],
                queryFn: () => getCurrentMovieById(props.id)
            },
            {
                queryKey: [ 'movies', props.id, 'similar', props.page ],
                queryFn: () => getSimilarMovies(props.id, props.page),
                placeholderData: keepPreviousData
            }
        ],
        combine: results => {
            return {
                movie: results[ 0 ].data && transformCurrentMovie(results[ 0 ].data),
                similar: {
                    movies: results[ 1 ].data?.results.map(transformMovie) ?? [],
                    total_pages: results[ 1 ].data?.total_pages ?? 0
                },
                pending: results.some(result => result.isPending),
                isError: results.some(result => result.isError)
            };
        }
    });

    if (data.pending) {
        return <Loader />;
    }

    if ( data.isError || !data.movie || !data.similar.movies.length) {
        notFound();
    }

    return (
        <Container className="p-movie-similar">
            <CurrentMovie
                movie={ data.movie }
                id={ props.id }
            />

            <Title className="p-movie-similar__title">
                Similar movies
            </Title>

            <div className="p-movie-similar__content">
                <ul className="c-media-list c-media-list--compact">
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
                        currentPage={ props.page }
                        totalPages={
                            data.similar.total_pages > 500
                                ? 500
                                : data.similar.total_pages 
                        }
                    />
                }
            </div>
        </Container>
    );
}