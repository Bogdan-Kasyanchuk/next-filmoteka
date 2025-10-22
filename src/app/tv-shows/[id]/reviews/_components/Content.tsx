'use client';

import { keepPreviousData, useQueries } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import CurrentTVShow from '@/components/app/CurrentTVShow';
import Pagination from '@/components/app/Pagination';
import ReviewCard from '@/components/ui/cards/ReviewCard';
import DataNotFound from '@/components/ui/data-display/DataNotFound';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { transformCurrentTVShow, transformReview } from '@/helpers/transformData';
import { getCurrentTVShowById, getReviewsToTVShow } from '@/services/api';

type Props = {
    id: string,
    currentPage: number
};

export default function Content(props: Props) {
    const data = useQueries({
        queries: [
            {
                queryKey: [ 'tv-shows', 'current', props.id ],
                queryFn: () => getCurrentTVShowById(props.id)
            },
            {
                queryKey: [ 'tv-shows', props.id, 'reviews', props.currentPage ],
                queryFn: () => getReviewsToTVShow(props.id, props.currentPage),
                placeholderData: keepPreviousData
            }
        ],
        combine: results => {
            return {
                tvShow: results[ 0 ].data && transformCurrentTVShow(results[ 0 ].data),
                reviews: {
                    items: results[ 1 ].data?.results.map(transformReview) ?? [],
                    total_pages: results[ 1 ].data?.total_pages ?? 0
                },
                pending: results.some(result => result.isPending),
                error: results.some(result => result.isError)
            };
        }
    });

    if (data.pending) {
        return <Loader />;
    }

    if (data.error || !data.tvShow) {
        return notFound();
    }

    if (!data.reviews.items.length) {
        return <DataNotFound />;
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
                        currentPage={ props.currentPage }
                        totalPages={ data.reviews.total_pages }
                    />
                }
            </div>
        </Container>
    );
}