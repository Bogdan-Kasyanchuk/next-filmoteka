'use client';

import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Fragment } from 'react';

import Pagination from '@/components/app/Pagination';
import MovieCard from '@/components/ui/cards/MovieCard';
import DataNotFound from '@/components/ui/data-display/DataNotFound';
import Loader from '@/components/ui/data-display/Loader';
import { MovieType } from '@/enums';
import { transformMovie } from '@/helpers/transformData';
import { getMovies } from '@/services/api';

type Props = {
    type: MovieType;
    currentPage: number,
}

export default function Content(props: Props) {
    const { data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
    } = useInfiniteQuery({
        queryKey: ['movies', props.type, props.currentPage],
        queryFn: ({ pageParam }) => {
            console.log(pageParam);

            return getMovies(props.type, pageParam);
        },
        placeholderData: keepPreviousData,
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            // console.log(lastPage);

            return lastPage.page + 1;
        },
        // select: (data) => {
        //     const transformedResults = data.results.map(
        //         (movie) => transformMovie(movie));

        //     return {
        //         movies: transformedResults,
        //         total_pages: data.total_pages
        //     };
        // },
    });

    if (isLoading) return <div>Loading projects...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    if (!data) {
        return;
    }

    // console.log(data);

    return (
        // <>
        //     {
        //         isPending || isFetching
        //             ? <Loader />
        //             : data && data.movies.length > 0
        //                 ? <div className='p-movies__content'>
        //                     <ul className='p-movies__list'>
        //                         {
        //                             data.movies.map(
        //                                 (movie) => (
        //                                     <li key={movie.id}>
        //                                         <MovieCard movie={movie} />
        //                                     </li>
        //                                 )
        //                             )
        //                         }
        //                     </ul>

        //                     {
        //                         data.total_pages > 1 &&
        //                         <Pagination
        //                             currentPage={props.currentPage}
        //                             totalPages={data.total_pages}
        //                         />
        //                     }
        //                 </div>
        //                 : <DataNotFound />
        //     }
        // </>
        <div>
            <h1>Projects</h1>
            <ul>
                {
                    data.pages.map((page, i) => (
                        <Fragment key={i}>
                            {
                                page.results.map((item, index) => (
                                    <li
                                        className='text-2xl text-white'
                                        key={item.id}
                                    >{index + item.title + item.id}</li>
                                ))
                            }
                        </Fragment>
                    ))
                }
            </ul>
            {
                hasNextPage && (
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        className='text-2xl text-danger'
                    >
                        {isFetchingNextPage ? 'Loading more...' : 'Load More'}
                    </button>
                )
            }
        </div>
    );
}