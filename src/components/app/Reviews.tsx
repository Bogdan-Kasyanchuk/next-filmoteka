import ReviewCard from '@/components/ui/cards/ReviewCard';
import Title from '@/components/ui/typography/Title';
import { ReviewMapper } from '@/types';

type Props = {
    reviews: ReviewMapper[];
}

export default function Reviews(props: Props) {
    return (
        <div className='pt-[30px] border-t border-t-primary/75 -mx-2.5 px-2.5 xxxl:-mx-5 xxxl:px-5'>
            <Title
                order='h3'
                variant={3}
                className='-mt-1.5 font-bold uppercase'
            >
                Reviews
            </Title>

            <ul className='mt-5 grid grid-cols-1 gap-5'>
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