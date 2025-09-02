'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import MovieCard from '@/components/ui/cards/MovieCard';
import DataNotFound from '@/components/ui/data-display/DataNotFound';
import Loader from '@/components/ui/data-display/Loader';
import Pagination from '@/components/ui/data-display/Pagination';
import { MovieType } from '@/enums';
import { transformMovie } from '@/helpers/transformData';
import { getMovies } from '@/services/api';

type Props = {
    type: MovieType;
    currentPage: number,
}

export default function Content(props: Props) {
    const { data, isPending, isFetching } = useQuery({
        queryKey: ['movies', props.type, props.currentPage],
        queryFn: () => getMovies(props.type, props.currentPage),
        placeholderData: keepPreviousData,
        select: (data) => {
            const transformedResults = data.results.map(
                (movie) => transformMovie(movie));

            return {
                movies: transformedResults,
                total_pages: data.total_pages
            };
        },
    });

    return (
        <>
            {
                isPending || isFetching
                    ? <Loader />
                    : data && data.movies.length > 0
                        ? <div className='p-movies__content'>
                            <ul className='p-movies__media-list'>
                                {
                                    data.movies.map(
                                        (movie) => (
                                            <li key={movie.id}>
                                                <MovieCard movie={movie} />
                                            </li>
                                        )
                                    )
                                }
                            </ul>

                            <Pagination
                                currentPage={props.currentPage}
                                totalPages={data.total_pages}
                            />
                        </div>
                        : <DataNotFound />
            }
        </>
    );
}