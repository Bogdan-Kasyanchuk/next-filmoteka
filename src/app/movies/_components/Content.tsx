'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import Pagination from '@/components/app/Pagination';
import MovieCard from '@/components/ui/cards/MovieCard';
import DataNotFound from '@/components/ui/data-display/DataNotFound';
import Loader from '@/components/ui/data-display/Loader';
import { MovieType } from '@/enums';
import { transformMovie } from '@/helpers/transformData';
import { getMovies } from '@/services/api';
import { formatDate } from '@/utils/formateDate';

type Props = {
    type: MovieType,
    currentPage: number
};

export default function Content(props: Props) {
    const { data, isPending, isFetching } = useQuery({
        queryKey: [ 'movies', props.type, props.currentPage ],
        queryFn: () => getMovies(props.type, props.currentPage),
        placeholderData: keepPreviousData,
        select: data => ({
            movies: data.results.map(
                movie => transformMovie(movie)
            ),
            total_pages: data.total_pages,
            dates: data.dates
        })
    });

    if (isPending || isFetching) {
        return <Loader />;
    }

    if (!data || !data.movies.length) {
        return <DataNotFound />;
    }

    return (
        <div className="p-movies__content">
            {
                data.dates &&
                <div className="p-movies__dates">
                    { formatDate(data.dates.minimum, 'DD.MM.YYYY') }
                    { ' - ' }
                    { formatDate(data.dates.maximum, 'DD.MM.YYYY') }
                </div>
            }

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
                    currentPage={ props.currentPage }
                    totalPages={ data.total_pages }
                />
            }
        </div>
    );
}