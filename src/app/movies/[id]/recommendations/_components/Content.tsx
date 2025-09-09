'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import Pagination from '@/components/app/Pagination';
import MovieCard from '@/components/ui/cards/MovieCard';
import DataNotFound from '@/components/ui/data-display/DataNotFound';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { transformMovieDetailsForRecommendations } from '@/helpers/transformData';
import { getRecommendationsToMovie } from '@/services/api';

import CurrentMovie from './CurrentMovie';

type Props = {
    id: string;
    currentPage: number,
}

export default function Content(props: Props) {
    const { data, isPending, isFetching } = useQuery({
        queryKey: ['movies', props.id, 'recommendations', props.currentPage],
        queryFn: () => getRecommendationsToMovie(props.id, props.currentPage),
        placeholderData: keepPreviousData,
        select: (data) => {
            const transformedResults = transformMovieDetailsForRecommendations(data);

            return {
                movie: transformedResults.movie,
                recommendations: transformedResults.recommendations,
                total_pages: data.recommendations.total_pages
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
        <Container className='p-movie-recommendations'>
            <CurrentMovie
                movie={data.movie}
                id={props.id}
            />

            <Title className='p-movie-recommendations__title'>
                Recommendations
            </Title>

            {
                data.recommendations.length > 0
                    ? <div className='p-movie-recommendations__content'>
                        <ul className='p-movie-recommendations__list'>
                            {
                                data.recommendations.map(
                                    (movie) => (
                                        <li key={movie.id}>
                                            <MovieCard movie={movie} />
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
        </Container>
    );
}