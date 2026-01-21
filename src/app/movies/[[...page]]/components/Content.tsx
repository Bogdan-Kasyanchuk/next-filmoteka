'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import Pagination from '@/components/app/Pagination';
import MovieCard from '@/components/ui/cards/MovieCard';
import DataNotFound from '@/components/ui/data-display/DataNotFound';
import FailedLoadData from '@/components/ui/data-display/FailedLoadData';
import Loader from '@/components/ui/data-display/Loader';
import { MovieType } from '@/enums';
import { transformMovie } from '@/helpers/transformData';
import { getMovies } from '@/services/api';

type Props = {
    type: MovieType,
    page: number
};

export default function Content(props: Props) {
    const { data, isPending, isError, error } = useQuery({
        queryKey: [ 'movies', props.type, props.page ],
        queryFn: () => getMovies(props.type, props.page),
        placeholderData: keepPreviousData,
        select: data => ({
            movies: data.results.map(transformMovie),
            total_pages: data.total_pages
        })
    });

    if (isPending) {
        return <Loader />;
    }

    if (isError) {
        return (
            <FailedLoadData>{ error.message }</FailedLoadData>
        );
    }

    if (!data || !data.movies.length) {
        return <DataNotFound />;
    }

    return (
        <div className="p-movies__content">
            <ul className="p-movies__list">
                {
                    data.movies.map(
                        movie => (
                            <li key={ movie.id }>
                                <MovieCard movie={ movie } />
                            </li>
                        )
                    )
                }
            </ul>

            {
                data.total_pages > 1 &&
                <Pagination
                    currentPage={ props.page }
                    totalPages={ data.total_pages }
                />
            }
        </div>
    );
}