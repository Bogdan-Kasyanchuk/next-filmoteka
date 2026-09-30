'use client';

import { keepPreviousData, useQueries } from '@tanstack/react-query';
import { useExtracted, useLocale } from 'next-intl';

import Pagination from '@/components/app/Pagination';
import MovieCard from '@/components/ui/cards/MovieCard';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { MediaType } from '@/enums';
import { moviesQueryKeys } from '@/helpers/queryKeys';
import { transformCurrentMovie, transformMovie } from '@/helpers/transformData';
import { pagesSimilarUrl } from '@/routes';
import { getCurrentMovieById, getSimilarMovies } from '@/services/tmdb/movies';

import CurrentMovie from './CurrentMovie';

type Props = {
    id: string,
    page: number
};

export default function Content(props: Props) {
    const locale = useLocale();

    const t = useExtracted();
        
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
                movie: results[ 0 ].data ? transformCurrentMovie(results[ 0 ].data) : undefined,
                similar: {
                    movies: results[ 1 ].data?.results.map(transformMovie) ?? [],
                    total_pages: results[ 1 ].data?.total_pages ?? 1
                },
                pending: results.some(result => result.isPending),
                error: results.find(result => result.isError && !result.data)?.error
            };
        }
    });

    if (data.error) {
        throw new Error(data.error.message || 'Internal server error');
    }

    if (data.pending || !data.movie) {
        return <Loader />;
    }

    return (
        <Container className="p-movie-similar">
            <CurrentMovie
                movie={ data.movie }
                id={ props.id }
            />

            <Title className="p-movie-similar__title">
                { t('Similar movies') }
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
                        path={ pagesSimilarUrl(MediaType.MOVIE, props.id) }
                    />
                }
            </div>
        </Container>
    );
}