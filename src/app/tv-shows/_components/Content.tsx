'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import Pagination from '@/components/app/Pagination';
import TVShowCard from '@/components/ui/cards/TVShowCard';
import DataNotFound from '@/components/ui/data-display/DataNotFound';
import FailedLoadData from '@/components/ui/data-display/FailedLoadData';
import Loader from '@/components/ui/data-display/Loader';
import { TVShowType } from '@/enums';
import { transformTVShow } from '@/helpers/transformData';
import { getTVShows } from '@/services/api';

type Props = {
    type: TVShowType,
    currentPage: number
};

export default function Content(props: Props) {
    const { data, isPending, isError, error } = useQuery({
        queryKey: [ 'tv-shows', props.type, props.currentPage ],
        queryFn: () => getTVShows(props.type, props.currentPage),
        placeholderData: keepPreviousData,
        select: data => ({
            tvShows: data.results.map(transformTVShow),
            total_pages: data.total_pages
        })
    });

    if (isPending) {
        return <Loader />;
    }

    if (isError) {
        return (
            <FailedLoadData>{ error.message } </FailedLoadData>
        );
    }

    if (!data || !data.tvShows.length) {
        return <DataNotFound />;
    }

    return (
        <div className="p-tv-shows__content">
            <ul className="p-tv-shows__list">
                {
                    data.tvShows.map(
                        tvShow => (
                            <li key={ tvShow.id }>
                                <TVShowCard tvShow={ tvShow } />
                            </li>
                        )
                    )
                }
            </ul>

            {
                data.total_pages > 1 &&
                <Pagination
                    currentPage={ props.currentPage }
                    totalPages={ data.total_pages }
                />
            }
        </div>
    );
}