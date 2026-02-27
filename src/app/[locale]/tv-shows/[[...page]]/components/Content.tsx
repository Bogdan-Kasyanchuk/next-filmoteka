'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';

import Pagination from '@/components/app/Pagination';
import TVShowCard from '@/components/ui/cards/TVShowCard';
import ErrorComponent from '@/components/ui/data-display/ErrorComponent';
import Loader from '@/components/ui/data-display/Loader';
import { TVShowType } from '@/enums';
import { tvShowsQueryKeys } from '@/helpers/queryKeys';
import { transformTVShow } from '@/helpers/transformData';
import { getTVShows } from '@/services/tmdb/tvShows';

type Props = {
    type: TVShowType,
    page: number
};

export default function Content(props: Props) {
    const locale = useLocale();
        
    const { data, isPending, isError, error } = useQuery({
        queryKey: tvShowsQueryKeys.alltvShows(props.type, props.page, locale),
        queryFn: () => getTVShows(props.type, props.page, locale),
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
        return <ErrorComponent errorMessage={ error.message } />;
    }

    return (
        <div className="p-tv-shows__content">
            <ul className="c-media-list">
                {
                    data.tvShows.map(
                        (tvShow, index) => (
                            <li key={ tvShow.id }>
                                <TVShowCard
                                    tvShow={ tvShow }
                                    preload={ index < 6 }
                                />
                            </li>
                        )
                    )
                }
            </ul>

            {
                data.total_pages > 1 &&
                <Pagination
                    currentPage={ props.page }
                    totalPages={ data.total_pages > 500 ? 500 : data.total_pages }
                />
            }
        </div>
    );
}