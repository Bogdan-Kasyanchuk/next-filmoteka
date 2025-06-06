'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import TVShowCard from '@/components/ui/cards/TVShowCard';
import Loader from '@/components/ui/data-display/Loader';
import Pagination from '@/components/ui/data-display/Pagination';
import { TVShowType } from '@/enums';
import { transformTVShow } from '@/helpers/transformData';
import { getTVShows } from '@/services/api';

type Props = {
    type: TVShowType;
    currentPage: number,
}

export default function Content(props: Props) {
    const { data, isPending, isFetching } = useQuery({
        queryKey: ['tv-shows', props.type, props.currentPage],
        queryFn: () => getTVShows(props.type, props.currentPage),
        placeholderData: keepPreviousData,
        select: (data) => {
            const transformedResults = data.results.map(
                (tvShow) => transformTVShow(tvShow));

            return {
                tvShows: transformedResults,
                total_pages: data.total_pages
            };
        },
    });

    return (
        <>
            {
                isPending || isFetching
                    ? <Loader />
                    : data && data.tvShows.length > 0
                        ? <div className='p-tv-shows__content'>
                            <ul className='p-tv-shows__media-list'>
                                {
                                    data.tvShows.map(
                                        (tvShow) => (
                                            <li key={tvShow.id}>
                                                <TVShowCard tvShow={tvShow} />
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