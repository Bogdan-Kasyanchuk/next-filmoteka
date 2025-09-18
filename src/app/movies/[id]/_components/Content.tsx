'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import Casts from '@/components/app/Casts';
import Recommendations from '@/components/app/Recommendations';
import Reviews from '@/components/app/Reviews';
import Videos from '@/components/app/Videos';
import MovieCard from '@/components/ui/cards/MovieCard';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import { transformMovieDetails } from '@/helpers/transformData';
import { pagesMovieshUrl } from '@/routes';
import { getMovieById } from '@/services/api';
import { MovieMapper } from '@/types';

import MovieDetails from './MovieDetails';

type Props = {
    id: string
}

export default function Content(props: Props) {
    const { data, isPending, isFetching } = useQuery({
        queryKey: ['movies', props.id],
        queryFn: () => getMovieById(props.id),
        select: (data) => transformMovieDetails(data),
    });

    if (isPending || isFetching) {
        return <Loader />;
    }

    if (!data) {
        return notFound();
    }

    return (
        <div className='p-movie'>
            <MovieDetails
                {...data.movie}
                id={props.id}
            />

            <Container className='p-movie__container'>
                {
                    data.videos.length > 0 &&
                    <Videos videos={data.videos} />
                }

                {
                    data.cast.length > 0 &&
                    <Casts casts={data.cast} />
                }

                {
                    data.recommendations.items.length > 0 &&
                    <Recommendations<MovieMapper>
                        recommendations={data.recommendations}
                        item={(item) => <MovieCard movie={item} />}
                        showAllPath={`${pagesMovieshUrl()}/${props.id}/recommendations`}
                    />
                }

                {
                    data.reviews.items.length > 0 &&
                    <Reviews
                        reviews={data.reviews}
                        showAllPath={`${pagesMovieshUrl()}/${props.id}/reviews`}
                    />
                }
            </Container>
        </div>
    );
}