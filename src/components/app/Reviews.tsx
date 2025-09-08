import Link from 'next/link';

import ReviewCard from '@/components/ui/cards/ReviewCard';
import Title from '@/components/ui/typography/Title';
import { ReviewMapper } from '@/types';

type Props = {
    reviews: {
        items: ReviewMapper[],
        totalPages: number,
    },
    showAllPath: string;
}

export default function Reviews(props: Props) {
    return (
        <div className='с-reviews'>
            <Title
                order='h3'
                variant={3}
                className='с-reviews__title'
            >
                Reviews
            </Title>

            <ul className='с-reviews__list'>
                {
                    props.reviews.items.map(
                        (item, index) => (
                            <li key={index}>
                                <ReviewCard review={item} />
                            </li>
                        )
                    )
                }
            </ul>

            {
                props.reviews.totalPages > 1 &&
                <Link
                    href={props.showAllPath}
                    className='с-reviews__show-all-button'
                >
                    Show all reviews
                </Link>
            }
        </div>
    );
}