'use client';

import { keepPreviousData, useQueries } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import CurrentMovie from '@/components/app/CurrentMovie';
import Pagination from '@/components/app/Pagination';
import MovieCard from '@/components/ui/cards/MovieCard';
import DataNotFound from '@/components/ui/data-display/DataNotFound';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { transformCurrentMovie, transformMovie } from '@/helpers/transformData';
import { getCurrentMovieById, getRecommendationsMovies } from '@/services/api';

type Props = {
    id: string;
    currentPage: number,
}

export default function Content(props: Props) {
    const data = useQueries({
        queries: [
            {
                queryKey: ['movies', props.id, 'recommendations'],
                queryFn: () => getCurrentMovieById(props.id),
            },
            {
                queryKey: ['movies', props.id, 'recommendations', props.currentPage],
                queryFn: () => getRecommendationsMovies(props.id, props.currentPage),
                placeholderData: keepPreviousData,
            },
        ],
        combine: (results) => {
            return {
                movie: results[0].data && transformCurrentMovie(results[0].data),
                recommendations: {
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

    if (!data.movie || !data.recommendations.movies) {
        return notFound();
    }

    if (!data.recommendations.movies.length) {
        return <DataNotFound />;
    }

    return (
        <Container className='p-movie-recommendations'>
            <CurrentMovie
                movie={data.movie}
                id={props.id}
            />

            <Title className='p-movie-recommendations__title'>
                Recommendations
            </Title>

            <div className='p-movie-recommendations__content'>
                <ul className='p-movie-recommendations__list'>
                    {
                        data.recommendations.movies.map(
                            (movie) => (
                                <li key={movie.id}>
                                    <MovieCard movie={movie} />
                                </li>
                            )
                        )
                    }
                </ul>

                {
                    (data.recommendations.total_pages && data.recommendations.total_pages > 1) &&
                    <Pagination
                        currentPage={props.currentPage}
                        totalPages={data.recommendations.total_pages}
                    />
                }
            </div>
        </Container>
    );
}