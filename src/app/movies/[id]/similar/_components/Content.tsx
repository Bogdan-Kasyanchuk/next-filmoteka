'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import MovieCard from '@/components/ui/cards/MovieCard';
import Loader from '@/components/ui/data-display/Loader';
import Pagination from '@/components/ui/data-display/Pagination';
import Container from '@/components/ui/layouts/Container';
import { transformMovieDetailsForSimilar } from '@/helpers/transformData';
import { getSimilarToMovie } from '@/services/api';

import CurrentMovie from './CurrentMovie';

type Props = {
    id: string;
    currentPage: number,
}

export default function Content(props: Props) {
    const { data, isPending, isFetching } = useQuery({
        queryKey: ['movies', props.id, 'similar', props.currentPage],
        queryFn: () => getSimilarToMovie(props.id, props.currentPage),
        placeholderData: keepPreviousData,
        select: (data) => {
            const transformedResults = transformMovieDetailsForSimilar(data);

            return {
                movie: transformedResults.movie,
                similar: transformedResults.similar,
                total_pages: data.similar.total_pages
            };
        },
    });

    if (isPending || isFetching) {
        return <Loader />;
    }

    if (!data) {
        return notFound();
    }

    return (
        <Container className='p-movie-similar'>
            <CurrentMovie
                movie={data.movie}
                id={props.id}
            />

            {
                data.similar.length > 0
                    ? <div className='p-movie-similar__content'>
                        <ul className='p-movie-similar__media-list'>
                            {
                                data.similar.map(
                                    (movie) => (
                                        <li key={movie.id}>
                                            <MovieCard movie={movie} />
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
        </Container>
    );
}