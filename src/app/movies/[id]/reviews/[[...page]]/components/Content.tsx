'use client';

import { keepPreviousData, useQueries } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import CurrentMovie from '@/components/app/CurrentMovie';
import Pagination from '@/components/app/Pagination';
import ReviewCard from '@/components/ui/cards/ReviewCard';
import FailedLoadData from '@/components/ui/data-display/FailedLoadData';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { transformCurrentMovie, transformReview } from '@/helpers/transformData';
import { getReviewsToMovie } from '@/services/api';
import { getCurrentMovieByIdCached } from '@/services/cachedWrappers';

type Props = {
    id: string,
    page: number
};

export default function Content(props: Props) {
    const data = useQueries({
        queries: [
            {
                queryKey: [ 'movies', 'current', props.id ],
                queryFn: () => getCurrentMovieByIdCached(props.id)
            },
            {
                queryKey: [ 'movies', props.id, 'reviews', props.page ],
                queryFn: () => getReviewsToMovie(props.id, props.page),
                placeholderData: keepPreviousData
            }
        ],
        combine: results => {
            let error = { 
                isError: false,
                message: ''
            };

            results.forEach(result => {
                if (result.isError) {
                    error = {
                        isError: result.isError,
                        message: result.error.message
                    };
                }
            });
            
            return {
                movie: results[ 0 ].data && transformCurrentMovie(results[ 0 ].data),
                reviews: {
                    items: results[ 1 ].data?.results.map(transformReview) ?? [],
                    total_pages: results[ 1 ].data?.total_pages ?? 0
                },
                pending: results.some(result => result.isPending),
                error
            };
        }
    });

    if (data.pending) {
        return <Loader />;
    }

    if (data.error.isError) {
        return (
            <FailedLoadData>{ data.error.message }</FailedLoadData>
        );
    }

    if (!data.movie || !data.reviews.items.length) {
        return notFound();
    }

    return (
        <Container className="p-movie-reviews">
            <CurrentMovie
                movie={ data.movie }
                id={ props.id }
            />

            <Title className="p-movie-reviews__title">
                Reviews
            </Title>

            <div className="p-movie-reviews__content">
                <ul className="p-movie-reviews__list">
                    {
                        data.reviews.items.map(
                            (item, index) => (
                                <li key={ index }>
                                    <ReviewCard review={ item } />
                                </li>
                            )
                        )
                    }
                </ul>

                {
                    data.reviews.total_pages > 1 &&
                    <Pagination
                        currentPage={ props.page }
                        totalPages={ data.reviews.total_pages }
                    />
                }
            </div>
        </Container>
    );
}