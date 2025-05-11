'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import TVCard from '@/components/ui/cards/TVCard';
import Loader from '@/components/ui/data-display/Loader';
import Pagination from '@/components/ui/data-display/Pagination';
import { TVType } from '@/enums';
import { transformedTV } from '@/helpers/transformedData';
import { getTVs } from '@/services/api';

type Props = {
    type: TVType;
    currentPage: number,
}

export default function Content(props: Props) {
    const { data, isFetching } = useQuery({
        queryKey: ['tvs', props.type, props.currentPage],
        queryFn: () => getTVs(props.type, props.currentPage),
        placeholderData: keepPreviousData,
        select: (data) => {
            const transformedResults = data.results.map(
                (result) => transformedTV(result));

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
                        ? <div className='p-tvs__content'>
                            <ul className='p-tvs__media-list'>
                                {
                                    data.results.map(
                                        (result) => (
                                            <li key={result.id}>
                                                <TVCard tv={result} />
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