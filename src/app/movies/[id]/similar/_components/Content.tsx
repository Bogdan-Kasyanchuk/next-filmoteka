'use client';

import { keepPreviousData, useQueries } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import Pagination from '@/components/app/Pagination';
import MovieCard from '@/components/ui/cards/MovieCard';
import DataNotFound from '@/components/ui/data-display/DataNotFound';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { transformCurrentMovie, transformMovie } from '@/helpers/transformData';
import { getCurrentMovieById, getSimilarMovies } from '@/services/api';

import CurrentMovie from './CurrentMovie';

type Props = {
    id: string;
    currentPage: number,
}

export default function Content(props: Props) {
    const data = useQueries({
        queries: [
            {
                queryKey: ['movies', props.id, 'similar'],
                queryFn: () => getCurrentMovieById(props.id),
            },
            {
                queryKey: ['movies', props.id, 'similar', props.currentPage],
                queryFn: () => getSimilarMovies(props.id, props.currentPage),
                placeholderData: keepPreviousData,
            },
        ],
        combine: (results) => {
            return {
                movie: results[0].data && transformCurrentMovie(results[0].data),
                similar: {
                    movies: results[1].data && results[1].data.results.map(
                        (movie) => transformMovie(movie)
                    ),
                    total_pages: results[1].data?.total_pages
                },
                pending: results.some((result) => result.isPending),
                fetching: results.some((result) => result.isFetching),
            };
        },
    });

    if (data.pending || data.fetching) {
        return <Loader />;
    }

    if (!data.movie || !data.similar.movies) {
        return notFound();
    }

    return (
        <Container className='p-movie-similar'>
            <CurrentMovie
                movie={data.movie}
                id={props.id}
            />

            <Title className='p-movie-similar__title'>
                Similar
            </Title>

            {
                data.similar.movies.length > 0
                    ? <div className='p-movie-similar__content'>
                        <ul className='p-movie-similar__list'>
                            {
                                data.similar.movies.map(
                                    (movie) => (
                                        <li key={movie.id}>
                                            <MovieCard movie={movie} />
                                        </li>
                                    )
                                )
                            }
                        </ul>

                        {
                            (data.similar.total_pages && data.similar.total_pages > 1) &&
                            <Pagination
                                currentPage={props.currentPage}
                                totalPages={data.similar.total_pages}
                            />
                        }
                    </div>
                    : <DataNotFound />
            }
        </Container>
    );
}