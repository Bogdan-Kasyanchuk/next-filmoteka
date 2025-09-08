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

type Props = {
    query: string;
    currentPage: number,
}

export default function Content(props: Props) {
    const { data, isPending, isFetching } = useQuery({
        queryKey: ['search', props.query, props.currentPage],
        queryFn: () => getSearch(props.query, props.currentPage),
        placeholderData: keepPreviousData,
        select: (data) => {
            const transformedResults = data.results.filter(
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
                });

            return {
                results: transformedResults,
                total_pages: data.total_pages
            };
        },
    });

    return (
        <>
            {
                isPending || isFetching
                    ? <Loader />
                    : data && data.results.length > 0
                        ? <div className='p-search__content'>
                            <ul className='p-search__media-list'>
                                {
                                    data.results.map(
                                        (result) => (
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

                            <Pagination
                                currentPage={props.currentPage}
                                totalPages={data.total_pages}
                            />
                        </div>
                        : <div className='p-search__no-search-results'>
                            No search results
                        </div>
            }
        </>
    );
}