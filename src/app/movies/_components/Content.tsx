'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import MovieCard from '@/components/ui/cards/MovieCard';
import Loader from '@/components/ui/data-display/Loader';
import Pagination from '@/components/ui/data-display/Pagination';
import { MediaType, MovieType } from '@/enums';
import { getMovies } from '@/services/api';
import { MovieMapper } from '@/types';

type Props = {
    type: MovieType;
    currentPage: number,
}

export default function Content(props: Props) {
    const { data, isFetching } = useQuery({
        queryKey: ['movies', props.type, props.currentPage],
        queryFn: () => getMovies(props.type, props.currentPage),
        placeholderData: keepPreviousData,
        select: (data) => {
            const transformedResults = data.results.map<MovieMapper>(
                (result) => ({
                    id: result.id,
                    title: result.title,
                    original_title: result.original_title,
                    poster_path: result.poster_path,
                    media_type: MediaType.MOVIE,
                    vote_average: result.vote_average,
                }));

            return {
                results: transformedResults,
                total_pages: data.total_pages
            };
        },
    });

    return (
        <>
            {
                isFetching
                    ? <Loader />
                    : data && data.results.length > 0
                        ? <div className='p-movies__content'>
                            <ul className='p-movies__media-list'>
                                {
                                    data.results.map(
                                        (result) => (
                                            <li key={result.id}>
                                                <MovieCard movie={result} />
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
                        : <div className='grow flex items-center justify-center text-8xl'>
                            Data not found
                        </div>
            }
        </>
    );
}