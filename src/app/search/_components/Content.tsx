'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import Pagination from '@/components/app/Pagination';
import MovieCard from '@/components/ui/cards/MovieCard';
import PersonCard from '@/components/ui/cards/PersonCard';
import TVShowCard from '@/components/ui/cards/TVShowCard';
import Loader from '@/components/ui/data-display/Loader';
import { MediaType } from '@/enums';
import { transformMovie, transformPerson, transformTVShow } from '@/helpers/transformData';
import { getSearch } from '@/services/api';
import { MovieShema, PersonShema, TVShowShema } from '@/shemas';
import { Adult, MovieMapper, PersonMapper, TVShowMapper } from '@/types';

type Props = {
    type: 'multi' | MediaType;
    adult: Adult;
    query: string;
    currentPage: number,
}

export default function Content(props: Props) {
    const { data, isPending, isFetching } = useQuery({
        queryKey: ['search', props.type, props.adult, props.query, props.currentPage],
        queryFn: () => getSearch(props.type, props.adult, props.query, props.currentPage),
        placeholderData: keepPreviousData,
        select: (data) => ({
            results: data.results.map(
                (result) => {
                    if (result.media_type === MediaType.MOVIE || props.type === MediaType.MOVIE) {
                        return transformMovie(result as MovieShema);
                    }

                    if (result.media_type === MediaType.TV_SHOW || props.type === MediaType.TV_SHOW) {
                        return transformTVShow(result as TVShowShema);
                    }

                    if (result.media_type === MediaType.PERSON || props.type === MediaType.PERSON) {
                        return transformPerson(result as PersonShema);
                    }
                }),
            total_pages: data.total_pages
        })
    });

    if (isPending || isFetching) {
        return <Loader />;
    }

    if (!data || !data.results.length) {
        return <div className='p-search__no-search-results'>
            No search results
        </div>;
    }

    return (
        <div className='p-search__content'>
            <ul className='p-search__list'>
                {
                    data.results.map(
                        (result) => (
                            result &&
                            <li key={result.id}>
                                {
                                    props.type === 'multi'
                                        ? <CardForMultiType result={result} />
                                        : <Card
                                            result={result}
                                            type={props.type}
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
                    currentPage={props.currentPage}
                    totalPages={data.total_pages}
                />
            }
        </div>
    );
}

type CardForMultiTypeProps = {
    result: MovieMapper | TVShowMapper | PersonMapper
}

function CardForMultiType(props: CardForMultiTypeProps) {
    switch (props.result.media_type) {
        case MediaType.MOVIE:
            return <MovieCard movie={props.result} />;

        case MediaType.TV_SHOW:
            return <TVShowCard tvShow={props.result} />;

        case MediaType.PERSON:
            return <PersonCard person={props.result} />;
    }
}

type CardProps = {
    result: MovieMapper | TVShowMapper | PersonMapper
    type: MediaType
}

function Card(props: CardProps) {
    switch (props.type) {
        case MediaType.MOVIE:
            return <MovieCard movie={props.result as MovieShema} />;

        case MediaType.TV_SHOW:
            return <TVShowCard tvShow={props.result as TVShowShema} />;

        case MediaType.PERSON:
            return <PersonCard person={props.result as PersonShema} />;
    }
}