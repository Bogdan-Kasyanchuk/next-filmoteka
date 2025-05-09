'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import MovieCard from '@/components/ui/cards/MovieCard';
import TVCard from '@/components/ui/cards/TVCard';
import Loader from '@/components/ui/data-display/Loader';
import Pagination from '@/components/ui/data-display/Pagination';
import { MediaType, TimeType } from '@/enums';
import { getTrendings } from '@/services/api';
import { MovieMapper, TVMapper } from '@/types';

type Props = {
    type: 'all' | MediaType;
    time: TimeType;
    currentPage: number,
}

export default function Content(props: Props) {
    const { data, isFetching } = useQuery({
        queryKey: ['trendings', props.type, props.time, props.currentPage],
        queryFn: () => getTrendings(props.type, props.time, props.currentPage),
        placeholderData: keepPreviousData,
        select: (data) => {
            const transformedResults = data.results.map<MovieMapper | TVMapper>(
                (result) => {
                    if (result.media_type === MediaType.MOVIE) {
                        return {
                            id: result.id,
                            title: result.title,
                            original_title: result.original_title,
                            poster_path: result.poster_path,
                            media_type: MediaType.MOVIE,
                            vote_average: result.vote_average,
                        };
                    } else {
                        return {
                            id: result.id,
                            name: result.name,
                            original_name: result.original_name,
                            poster_path: result.poster_path,
                            media_type: MediaType.TV,
                            vote_average: result.vote_average,
                        };
                    }
                });

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
                        ? <div className='p-home__content'>
                            <ul className='p-home__media-list'>
                                {
                                    data.results.map(
                                        (result) => (
                                            <li key={result.id}>
                                                {
                                                    result.media_type === MediaType.MOVIE
                                                        ? <MovieCard movie={result} />
                                                        : <TVCard tv={result} />
                                                }
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