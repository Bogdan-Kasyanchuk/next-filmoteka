'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import MovieCard from '@/components/ui/cards/MovieCard';
import TVCard from '@/components/ui/cards/TVCard';
import Loader from '@/components/ui/data-display/Loader';
import Pagination from '@/components/ui/data-display/Pagination';
import { MediaType, TimeType } from '@/enums';
import { getTrendings } from '@/services/api';

// import { MovieMapper, TVMapper } from '@/types';

export default function Content() {
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const { data, isFetching } = useQuery({
        queryKey: ['trendings', currentPage],
        queryFn: () => getTrendings('all', TimeType.DAY, currentPage),
        select: (data) => data,
    });

    return (
        <>
            {
                isFetching
                    ? <Loader />
                    :
                    <div className='p-home__content'>
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

                        <Pagination totalPages={data.total_pages} />
                    </div>
            }
        </>
    );
}