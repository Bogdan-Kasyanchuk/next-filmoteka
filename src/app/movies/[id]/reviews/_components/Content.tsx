'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import Pagination from '@/components/app/Pagination';
import ReviewCard from '@/components/ui/cards/ReviewCard';
import DataNotFound from '@/components/ui/data-display/DataNotFound';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { transformMovieDetailsForReviews } from '@/helpers/transformData';
import { getReviewsToMovie } from '@/services/api';

import CurrentMovie from './CurrentMovie';

type Props = {
    id: string;
    currentPage: number,
}

export default function Content(props: Props) {
    const { data, isPending, isFetching } = useQuery({
        queryKey: ['movies', props.id, 'reviews', props.currentPage],
        queryFn: () => getReviewsToMovie(props.id, props.currentPage),
        placeholderData: keepPreviousData,
        select: (data) => {
            const transformedResults = transformMovieDetailsForReviews(data);

            return {
                movie: transformedResults.movie,
                reviews: transformedResults.reviews,
                total_pages: data.reviews.total_pages
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
        <Container className='p-movie-reviews'>
            <CurrentMovie
                movie={data.movie}
                id={props.id}
            />

            <Title className='p-movie-reviews__title'>
                Reviews
            </Title>

            {
                data.reviews.length > 0
                    ? <div className='p-movie-reviews__content'>
                        <ul className='p-movie-reviews__list'>
                            {
                                data.reviews.map(
                                    (item, index) => (
                                        <li key={index}>
                                            <ReviewCard review={item} />
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