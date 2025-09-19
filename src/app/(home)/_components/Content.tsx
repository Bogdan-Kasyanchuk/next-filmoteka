'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import Pagination from '@/components/app/Pagination';
import MovieCard from '@/components/ui/cards/MovieCard';
import PersonCard from '@/components/ui/cards/PersonCard';
import TVShowCard from '@/components/ui/cards/TVShowCard';
import DataNotFound from '@/components/ui/data-display/DataNotFound';
import Loader from '@/components/ui/data-display/Loader';
import { MediaType, TimeType } from '@/enums';
import { transformMovie, transformPerson, transformTVShow } from '@/helpers/transformData';
import { getTrendings } from '@/services/api';

type Props = {
    type: 'all' | MediaType;
    time: TimeType;
    currentPage: number,
}

export default function Content(props: Props) {
    const { data, isPending, isFetching } = useQuery({
        queryKey: ['trendings', props.type, props.time, props.currentPage],
        queryFn: () => getTrendings(props.type, props.time, props.currentPage),
        placeholderData: keepPreviousData,
        select: (data) => ({
            results: data.results.map(
                (result) => {
                    if (result.media_type === MediaType.MOVIE) {
                        return transformMovie(result);
                    }

                    if (result.media_type === MediaType.TV_SHOW) {
                        return transformTVShow(result);
                    }

                    if (result.media_type === MediaType.PERSON) {
                        return transformPerson(result);
                    }
                }),
            total_pages: data.total_pages
        })
    });

    return (
        <>
            {
                isPending || isFetching
                    ? <Loader />
                    : data && data.results.length > 0
                        ? <div className='p-home__content'>
                            <ul className='p-home__list'>
                                {
                                    data.results.map(
                                        (result) => (
                                            result &&
                                            <li key={result.id}>
                                                {
                                                    result.media_type === MediaType.MOVIE &&
                                                    <MovieCard movie={result} />
                                                }

                                                {
                                                    result.media_type === MediaType.TV_SHOW &&
                                                    <TVShowCard tvShow={result} />
                                                }

                                                {
                                                    result.media_type === MediaType.PERSON &&
                                                    <PersonCard person={result} />
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
                        : <DataNotFound />
            }
        </>
    );
}