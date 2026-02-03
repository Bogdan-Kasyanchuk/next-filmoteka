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
import { getRecommendationsMovies } from '@/services/api';
import { getCurrentMovieByIdCached } from '@/services/cachedWrappers';

type Props = {
    id: string,
    page: number
};

export default function Content(props: Props) {
    const data = useQueries({
        queries: [
            {
                queryKey: [ 'movies', 'current', props.id ],
                queryFn: () => getCurrentMovieByIdCached(props.id)
            },
            {
                queryKey: [ 'movies', props.id, 'recommendations', props.page ],
                queryFn: () => getRecommendationsMovies(props.id, props.page),
                placeholderData: keepPreviousData
            }
        ],
        combine: results => {
            return {
                movie: results[ 0 ].data && transformCurrentMovie(results[ 0 ].data),
                recommendations: {
                    movies: results[ 1 ].data?.results.map(transformMovie) ?? [],
                    total_pages: results[ 1 ].data?.total_pages ?? 0
                },
                isPending: results.some(result => result.isPending),
                isError: results.some(result => result.isError)
            };
        }
    });

    if (data.isPending) {
        return <Loader />;
    }

    if (data.isError || !data.movie || !data.recommendations.movies.length) {
        notFound();
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
                        currentPage={ props.page }
                        totalPages={
                            data.recommendations.total_pages > 500
                                ? 500
                                : data.recommendations.total_pages 
                        }
                    />
                }
            </div>
        </Container>
    );
}