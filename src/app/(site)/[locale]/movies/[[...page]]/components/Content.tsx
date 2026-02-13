'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { useLocale } from 'next-intl';

import Pagination from '@/components/app/Pagination';
import MovieCard from '@/components/ui/cards/MovieCard';
import Loader from '@/components/ui/data-display/Loader';
import { MovieType } from '@/enums';
import { moviesQueryKeys } from '@/helpers/queryKeys';
import { transformMovie } from '@/helpers/transformData';
import { getMovies } from '@/services/tmdb/movies';

type Props = {
    type: MovieType,
    page: number
};

export default function Content(props: Props) {
    const locale = useLocale();
        
    const { data, isPending, isError } = useQuery({
        queryKey: moviesQueryKeys.allMovies(props.type, props.page, locale),
        queryFn: () => getMovies(props.type, props.page, locale),
        placeholderData: keepPreviousData,
        select: data => ({
            movies: data.results.map(transformMovie),
            total_pages: data.total_pages
        })
    });

    if (isPending) {
        return <Loader />;
    }

    if (isError || !data || !data.movies.length) {
        notFound();
    }

    return (
        <div className="p-movies__content">
            <ul className="c-media-list">
                {
                    data.movies.map(
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
                data.total_pages > 1 &&
                <Pagination
                    currentPage={ props.page }
                    totalPages={ data.total_pages > 500 ? 500 : data.total_pages }
                />
            }
        </div>
    );
}