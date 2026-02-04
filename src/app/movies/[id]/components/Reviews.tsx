'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import ReviewCard from '@/components/ui/cards/ReviewCard';
import Title from '@/components/ui/typography/Title';
import { getReviewsToMovie } from '@/services/tmdbApi/movies';
import { ReviewMapper } from '@/types';

type Props = {
    id: string
};

export default function Reviews(props: Props) {
    const { data, isError } = useSuspenseQuery({
        queryKey: [ 'movies', props.id, 'reviews' ],
        queryFn: () => getReviewsToMovie(props.id, 1),
        select: data => {
            if (!data.results.length) {
                return [];  
            }

            // return data.results.filter(
            //     video => {
            //         const isYoutubeVideo = video.site === VideoSiteType.YOUTUBE && (video.type === VideoType.TRAILER || video.type === VideoType.CLIP);

            //         if (isYoutubeVideo) {
            //             return transformVideo(video);
            //         }
            //     }
            // ) as VideoMapper[];
        }
    });

    if (isError || !data.length) {
        return null;
    }
    
    return (
        <div className="с-reviews">
            <Title
                order="h3"
                variant={ 3 }
                className="с-reviews__title"
            >
                Reviews
            </Title>

            { /* <ul className="с-reviews__list">
                {
                    props.reviews.items.map(
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
            </ul> */ }

            { /* {
                props.reviews.totalPages > 1 &&
                <Link
                    href={ props.showAllPath }
                    className="с-reviews__show-all-button"
                >
                    Show all reviews
                </Link>
            } */ }
        </div>
    );
}