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
    const { data, isFetching } = useQuery({
        queryKey: ['tv-shows', props.type, props.currentPage],
        queryFn: () => getTVShows(props.type, props.currentPage),
        placeholderData: keepPreviousData,
        select: (data) => {
            const transformedResults = data.results.map(
                (result) => transformTVShow(result));

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
                        ? <div className='p-tv-shows__content'>
                            <ul className='p-tv-shows__media-list'>
                                {
                                    data.results.map(
                                        (result) => (
                                            <li key={result.id}>
                                                <TVShowCard tvShow={result} />
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