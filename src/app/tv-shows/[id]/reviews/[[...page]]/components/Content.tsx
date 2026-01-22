'use client';

import { keepPreviousData, useQueries } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import CurrentTVShow from '@/components/app/CurrentTVShow';
import Pagination from '@/components/app/Pagination';
import ReviewCard from '@/components/ui/cards/ReviewCard';
import FailedLoadData from '@/components/ui/data-display/FailedLoadData';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { transformCurrentTVShow, transformReview } from '@/helpers/transformData';
import { getReviewsToTVShow } from '@/services/api';
import { getCurrentTVShowByIdCached } from '@/services/cachedWrappers';

type Props = {
    id: string,
    page: number
};

export default function Content(props: Props) {
    const data = useQueries({
        queries: [
            {
                queryKey: [ 'tv-shows', 'current', props.id ],
                queryFn: () => getCurrentTVShowByIdCached(props.id)
            },
            {
                queryKey: [ 'tv-shows', props.id, 'reviews', props.page ],
                queryFn: () => getReviewsToTVShow(props.id, props.page),
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
                tvShow: results[ 0 ].data && transformCurrentTVShow(results[ 0 ].data),
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

    if (!data.tvShow || !data.reviews.items.length) {
        return notFound();
    }

    return (
        <Container className="p-tv-show-reviews">
            <CurrentTVShow
                tvShow={ data.tvShow }
                id={ props.id }
            />

            <Title className="p-tv-show-reviews__title">
                Reviews
            </Title>

            <div className="p-tv-show-reviews__content">
                <ul className="p-tv-show-reviews__list">
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