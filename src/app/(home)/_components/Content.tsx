'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import MovieCard from '@/components/ui/cards/MovieCard';
import TVShowCard from '@/components/ui/cards/TVShowCard';
import Loader from '@/components/ui/data-display/Loader';
import Pagination from '@/components/ui/data-display/Pagination';
import { MediaType, TimeType } from '@/enums';
import { transformMovie, transformTVShow } from '@/helpers/transformData';
import { getTrendings } from '@/services/api';

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
            const transformedResults = data.results.map(
                (result) => {
                    if (result.media_type === MediaType.MOVIE) {
                        return transformMovie(result);
                    } else {
                        return transformTVShow(result);
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
                                                        : <TVShowCard tvShow={result} />
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
                        : <div className='uppercase text-primary font-bold grow flex items-center justify-center text-8xl'>
                            Data not found
                        </div>
            }
        </>
    );
}