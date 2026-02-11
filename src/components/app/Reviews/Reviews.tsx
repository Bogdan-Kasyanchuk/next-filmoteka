'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import ReviewCard from '@/components/ui/cards/ReviewCard';
import { MediaType } from '@/enums';
import { transformReview } from '@/helpers/transformData';
import { getReviews } from '@/services/tmdbApi/general';

import Wrapper from './Wrapper';

type Props = {
    type: MediaType.MOVIE | MediaType.TV_SHOW,
    id: string
};

export default function Reviews(props: Props) {
    const {
        data,
        isError,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
    } = useSuspenseInfiniteQuery({
        queryKey: [ 'reviews', props.type, props.id ],
        queryFn: ({ pageParam }) => getReviews(props.type, props.id, pageParam),
        initialPageParam: 1,
        getNextPageParam: lastPage => {
            const nextPage = lastPage.page + 1;

            return nextPage <= lastPage.total_pages
                ? nextPage
                : undefined;
        },
        select: data => {
            if (!data.pages[ 0 ].results.length) {
                return null;  
            }

            return data.pages.flatMap(page => page.results.map(transformReview));
        }
    });

    if (isError || !data) {
        return null;
    }

    return (
        <Wrapper>
            <ul className="с-reviews__list">
                {
                    data.map(
                        (item, index) => (
                            <li
                                key={ index }
                                className="с-reviews__item"
                            >
                                <ReviewCard
                                    review={ item }
                                    isTextTruncated
                                />
                            </li>
                        )
                    )
                }
            </ul>

            {
                hasNextPage &&
                    <button
                        type="button"
                        className="с-reviews__load-more-button"
                        disabled = { isFetchingNextPage }
                        onClick={
                            () => {
                                fetchNextPage();
                            } 
                        }
                    >
                        { isFetchingNextPage ? 'Loading...' : 'Load more' }
                    </button>
            }
        </Wrapper>
    );
}