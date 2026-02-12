'use client';

import { keepPreviousData, useQueries } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { useLocale } from 'next-intl';

import CurrentMovie from '@/components/app/CurrentMovie';
import Pagination from '@/components/app/Pagination';
import MovieCard from '@/components/ui/cards/MovieCard';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { moviesQueryKeys } from '@/helpers/queryKeys';
import { transformCurrentMovie, transformMovie } from '@/helpers/transformData';
import { getCurrentMovieById, getSimilarMovies } from '@/services/tmdb/movies';

type Props = {
    id: string,
    page: number
};

export default function Content(props: Props) {
    const locale = useLocale();
        
    const data = useQueries({
        queries: [
            {
                queryKey: moviesQueryKeys.currentMovieById(props.id, locale),
                queryFn: () => getCurrentMovieById(props.id, locale)
            },
            {
                queryKey: moviesQueryKeys.similarMovies(props.id, props.page, locale),
                queryFn: () => getSimilarMovies(props.id, props.page, locale),
                placeholderData: keepPreviousData
            }
        ],
        combine: results => {
            return {
                movie: results[ 0 ].data && transformCurrentMovie(results[ 0 ].data),
                similar: {
                    movies: results[ 1 ].data?.results.map(transformMovie) ?? [],
                    total_pages: results[ 1 ].data?.total_pages ?? 1
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
                            (movie, index) => (
                                <li key={ movie.id }>
                                    <MovieCard
                                        movie={ movie }
                                        preload={ index < 6 }
                                    />
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