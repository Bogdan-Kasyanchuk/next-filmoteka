import ReviewCard from '@/components/ui/cards/ReviewCard';
import Title from '@/components/ui/typography/Title';
import { ReviewMapper } from '@/types';

type Props = {
    reviews: ReviewMapper[];
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
                    props.reviews.map(
                        (review, index) => (
                            <li key={index}>
                                <ReviewCard review={review} />
                            </li>
                        )
                    )
                }
            </ul>
        </div>
    );
}