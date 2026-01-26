'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import Pagination from '@/components/app/Pagination';
import MovieCard from '@/components/ui/cards/MovieCard';
import PersonCard from '@/components/ui/cards/PersonCard';
import TVShowCard from '@/components/ui/cards/TVShowCard';
import DataNotFound from '@/components/ui/data-display/DataNotFound';
import FailedLoadData from '@/components/ui/data-display/FailedLoadData';
import Loader from '@/components/ui/data-display/Loader';
import { MediaType, TimeType } from '@/enums';
import { transformMovie, transformPerson, transformTVShow } from '@/helpers/transformData';
import { getTrendings } from '@/services/api';
import { MovieMapper, PersonMapper, TVShowMapper } from '@/types';

type Props = {
    type: 'all' | MediaType,
    page: number
};

export default function Content(props: Props) {
    const { data, isPending, isError, error } = useQuery({
        queryKey: [ 'trendings', props.type, TimeType.WEEK, props.page ],
        queryFn: () => getTrendings(props.type, TimeType.WEEK, props.page),
        placeholderData: keepPreviousData,
        select: data => ({
            results: data.results.map(
                result => {
                    switch (result.media_type) {
                        case MediaType.MOVIE:
                            return transformMovie(result);
                        case MediaType.TV_SHOW:
                            return transformTVShow(result);
                        case MediaType.PERSON:
                            return transformPerson(result);
                    }
                }),
            total_pages: data.total_pages
        })
    });

    if (isPending) {
        return <Loader />;
    }

    if (isError) {
        return (
            <FailedLoadData>{ error.message }</FailedLoadData>
        );
    }

    if (!data || !data.results.length) {
        return <DataNotFound />;
    }

    return (
        <div className="p-trending__content">
            <ul className="p-trending__list">
                {
                    data.results.map(
                        result => (
                            result &&
                            <li key={ result.id }>
                                <Card result={ result } />
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

type CardProps = {
    result: MovieMapper | TVShowMapper | PersonMapper
};

function Card(props: CardProps) {
    switch (props.result.media_type) {
        case MediaType.MOVIE:
            return <MovieCard movie={ props.result } />;

        case MediaType.TV_SHOW:
            return <TVShowCard tvShow={ props.result } />;

        case MediaType.PERSON:
            return <PersonCard person={ props.result } />;
    }
}