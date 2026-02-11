'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import Pagination from '@/components/app/Pagination';
import MovieCard from '@/components/ui/cards/MovieCard';
import PersonCard from '@/components/ui/cards/PersonCard';
import TVShowCard from '@/components/ui/cards/TVShowCard';
import Loader from '@/components/ui/data-display/Loader';
import NoSearchResults from '@/components/ui/data-display/NoSearchResults';
import { MediaType } from '@/enums';
import { transformMovie, transformPerson, transformTVShow } from '@/helpers/transformData';
import { getSearch } from '@/services/tmdbApi/general';
import { MovieShema, PersonShema, TVShowShema } from '@/shemas';
import { Adult, MovieMapper, PersonMapper, TVShowMapper } from '@/types';

type Props = {
    type: 'multi' | MediaType,
    adult: Adult,
    query: string,
    page: number
};

export default function Content(props: Props) {
    const { data, isPending, isError } = useQuery({
        queryKey: [ 'search', props.type, props.adult, props.query, props.page ],
        queryFn: () => getSearch(props.type, props.adult, props.query, props.page),
        placeholderData: keepPreviousData,
        select: data => ({
            results: data.results.map(
                result => {
                    if (result.media_type === MediaType.MOVIE || props.type === MediaType.MOVIE) {
                        return transformMovie(result as MovieShema);
                    }

                    if (result.media_type === MediaType.TV_SHOW || props.type === MediaType.TV_SHOW) {
                        return transformTVShow(result as TVShowShema);
                    }

                    if (result.media_type === MediaType.PERSON || props.type === MediaType.PERSON) {
                        return transformPerson(result as PersonShema);
                    }
                }).filter(item => item !== undefined),
            total_pages: data.total_pages
        })
    });

    if (isPending) {
        return <Loader />;
    }

    if (isError || !data || !data.results.length) {
        return <NoSearchResults />;
    }

    return (
        <div className="p-search__content">
            <ul className="c-media-list c-media-list--compact">
                {
                    data.results.map(
                        (result, index) => (
                            <li key={ result.id }>
                                {
                                    props.type === 'multi'
                                        ? <CardForMultiType
                                            result={ result }
                                            preload={ index < 6 }
                                        />
                                        : <Card
                                            result={ result }
                                            type={ props.type }
                                            preload={ index < 6 }
                                        />
                                }
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

type CardForMultiTypeProps = {
    result: MovieMapper | TVShowMapper | PersonMapper,
    preload?: boolean
};

function CardForMultiType(props: CardForMultiTypeProps) {
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

type CardProps = {
    result: MovieMapper | TVShowMapper | PersonMapper,
    type: MediaType,
    preload?: boolean
};

function Card(props: CardProps) {
    switch (props.type) {
        case MediaType.MOVIE:
            return (
                <MovieCard
                    movie={ props.result as MovieMapper }
                    preload={ props.preload }
                />
            );

        case MediaType.TV_SHOW:
            return (
                <TVShowCard
                    tvShow={ props.result as TVShowMapper }
                    preload={ props.preload }
                />
            );

        case MediaType.PERSON:
            return (
                <PersonCard
                    person={ props.result as PersonMapper }
                    preload={ props.preload }
                />
            );
    }
}