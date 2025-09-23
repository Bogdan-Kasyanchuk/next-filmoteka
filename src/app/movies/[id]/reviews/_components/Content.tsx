'use client';

import { keepPreviousData, useQueries } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import CurrentMovie from '@/components/app/CurrentMovie';
import Pagination from '@/components/app/Pagination';
import ReviewCard from '@/components/ui/cards/ReviewCard';
import DataNotFound from '@/components/ui/data-display/DataNotFound';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { transformCurrentMovie, transformReview } from '@/helpers/transformData';
import { getCurrentMovieById, getReviewsToMovie } from '@/services/api';

type Props = {
    id: string;
    currentPage: number,
}

export default function Content(props: Props) {
    const data = useQueries({
        queries: [
            {
                queryKey: ['movies', props.id, 'reviews'],
                queryFn: () => getCurrentMovieById(props.id),
            },
            {
                queryKey: ['movies', props.id, 'reviews', props.currentPage],
                queryFn: () => getReviewsToMovie(props.id, props.currentPage),
                placeholderData: keepPreviousData,
            },
        ],
        combine: (results) => {
            return {
                movie: results[0].data && transformCurrentMovie(results[0].data),
                reviews: {
                    items: results[1].data && results[1].data.results.map(
                        (review) => transformReview(review)
                    ),
                    total_pages: results[1].data?.total_pages
                },
                pending: results.some((result) => result.isPending),
                fetching: results.some((result) => result.isFetching),
            };
        },
    });

    if (data.pending || data.fetching) {
        return <Loader />;
    }

    if (!data.movie || !data.reviews.items) {
        return notFound();
    }

    if (!data.reviews.items.length) {
        return <DataNotFound />;
    }

    return (
        <Container className='p-movie-reviews'>
            <CurrentMovie
                movie={data.movie}
                id={props.id}
            />

            <Title className='p-movie-reviews__title'>
                Reviews
            </Title>

            <div className='p-movie-reviews__content'>
                <ul className='p-movie-reviews__list'>
                    {
                        data.reviews.items.map(
                            (item, index) => (
                                <li key={index}>
                                    <ReviewCard review={item} />
                                </li>
                            )
                        )
                    }
                </ul>

                {
                    (data.reviews.total_pages && data.reviews.total_pages > 1) &&
                    <Pagination
                        currentPage={props.currentPage}
                        totalPages={data.reviews.total_pages}
                    />
                }
            </div>
        </Container>
    );
}