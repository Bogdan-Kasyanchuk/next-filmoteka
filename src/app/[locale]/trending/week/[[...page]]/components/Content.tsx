'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { useLocale } from 'next-intl';

import Pagination from '@/components/app/Pagination';
import MovieCard from '@/components/ui/cards/MovieCard';
import PersonCard from '@/components/ui/cards/PersonCard';
import TVShowCard from '@/components/ui/cards/TVShowCard';
import Loader from '@/components/ui/data-display/Loader';
import { MediaType, TimeType } from '@/enums';
import { trendingsQueryKeys } from '@/helpers/queryKeys';
import { transformMovie, transformPerson, transformTVShow } from '@/helpers/transformData';
import { getTrendings } from '@/services/tmdb/general';
import { MovieMapper, PersonMapper, TVShowMapper } from '@/types';

type Props = {
    type: 'all' | MediaType,
    page: number
};

export default function Content(props: Props) {
    const locale = useLocale();
        
    const { data, isPending, isError } = useQuery({
        queryKey: trendingsQueryKeys.trendingsWeek(props.type, props.page, locale),
        queryFn: () => getTrendings(props.type, TimeType.WEEK, props.page, locale),
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

    if (isError || !data || !data.results.length) {
        notFound();
    }

    return (
        <div className="p-trending__content">
            <ul className="c-media-list">
                {
                    data.results.map(
                        (result, index) => (
                            <li key={ result.id }>
                                <Card
                                    result={ result }
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

type CardProps = {
    result: MovieMapper | TVShowMapper | PersonMapper,
    preload?: boolean
};

function Card(props: CardProps) {
    switch (props.result.media_type) {
        case MediaType.MOVIE:
            return (
                <MovieCard
                    movie={ props.result }
                    preload={ props.preload }
                />
            );

        case MediaType.TV_SHOW:
            return (
                <TVShowCard
                    tvShow={ props.result }
                    preload={ props.preload }
                />
            );

        case MediaType.PERSON:
            return (
                <PersonCard
                    person={ props.result }
                    preload={ props.preload }
                />
            );
    }
}