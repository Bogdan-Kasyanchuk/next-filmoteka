'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import MovieCard from '@/components/ui/cards/MovieCard';
import Loader from '@/components/ui/data-display/Loader';
import Pagination from '@/components/ui/data-display/Pagination';
import { MediaType } from '@/enums';
import { transformMovie } from '@/helpers/transformData';
import { getSimilars } from '@/services/api';
import { MovieShema } from '@/shemas';

type Props = {
    id: string;
    currentPage: number,
}

export default function Content(props: Props) {
    const { data, isPending, isFetching } = useQuery({
        queryKey: ['similar', props.id, props.currentPage],
        queryFn: () => getSimilars<MovieShema>(MediaType.MOVIE, props.id, props.currentPage),
        placeholderData: keepPreviousData,
        select: (data) => {
            const transformedResults = data.results.map(
                (result) => transformMovie(result));

            return {
                results: transformedResults,
                total_pages: data.total_pages
            };
        },
    });

    return (
        <>
            {
                isPending || isFetching
                    ? <Loader />
                    : data && data.results.length > 0
                        ? <div className='p-movie-similar__content'>
                            <ul className='p-movie-similar__media-list'>
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
                        : <div className='uppercase text-primary font-bold grow flex items-center justify-center text-8xl'>
                            Data not found
                        </div>
            }
        </>
    );
}