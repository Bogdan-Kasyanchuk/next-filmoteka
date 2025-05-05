'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import MovieCard from '@/components/ui/cards/MovieCard';
import TVCard from '@/components/ui/cards/TVCard';
import Loader from '@/components/ui/data-display/Loader';
import Pagination from '@/components/ui/data-display/Pagination';
import { MediaType, TimeType } from '@/enums';
import { getTrendings } from '@/services/api';
import { MovieMapper, TVMapper } from '@/types';

export default function Content() {
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const { data, isFetching } = useQuery({
        queryKey: ['trendings', currentPage],
        queryFn: () => getTrendings('all', TimeType.DAY, currentPage),
        select: (data) => {
            const transformedResults = data.results.map(
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
                }) as Array<MovieMapper | TVMapper>;

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
                                        (item) => (
                                            <li key={item.id}>
                                                {
                                                    item.media_type === MediaType.MOVIE
                                                        ? <MovieCard movie={item} />
                                                        : <TVCard tv={item} />
                                                }
                                            </li>
                                        )
                                    )
                                }
                            </ul>

                            <Pagination
                                currentPage={currentPage}
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