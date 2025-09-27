import Image from 'next/image';

import { IMG_SIZES } from '@/helpers/parameters';
import { imageUrl } from '@/routes';
import { ReviewMapper } from '@/types';
import { formatDate } from '@/utils/formateDate';

import ReadMore from '../data-display/ReadMore';

type Props = {
    review: ReviewMapper;
}

export default function ReviewCard(props: Props) {
    if (!props.review.content) {
        return null;
    }

    return (
        <div className='c-review-card'>
            <div className='c-review-card__inner'>
                <div className='c-review-card__cover'>
                    <Image
                        src={
                            props.review.author.avatar_path
                                ? imageUrl(IMG_SIZES.REVIEWER_AVATAR, props.review.author.avatar_path)
                                : '/img/avatar-placeholder.svg'
                        }
                        sizes='92px'
                        alt={props.review.author.name || props.review.author.username}
                        fill
                    />
                </div>

                <div className='c-review-card__info'>
                    <div className='c-review-card__info-name'>
                        {
                            props.review.author.name &&
                            <p
                                className='c-review-card__name'
                                title={props.review.author.name}
                            >
                                {props.review.author.name}
                            </p>
                        }

                        {
                            props.review.author.username &&
                            <p
                                className='c-review-card__username'
                                title={props.review.author.username}
                            >
                                {props.review.author.username}
                            </p>
                        }
                    </div>

                    <ul className='c-review-card__info-list'>
                        <li className='c-review-card__info-list-item'>
                            <span>Rating:</span>
                            <span>{Math.round(props.review.author.rating * 10)}</span>
                        </li>

                        <li className='c-review-card__info-list-item'>
                            <span>Created:</span>
                            <span>{formatDate(props.review.created_at, 'DD.MM.YYYY')}</span>
                        </li>

                        {
                            props.review.updated_at &&
                            <li className='c-review-card__info-list-item'>
                                <span>Updated:</span>
                                <span>{formatDate(props.review.updated_at, 'DD.MM.YYYY')}</span>
                            </li>
                        }
                    </ul>
                </div>
            </div>

            <ReadMore
                maxChars={
                    {
                        mobile: 190,
                        tablet: 330,
                        desktop: 600
                    }
                }
                text={props.review.content}
                classNames={
                    {
                        text: 'c-review-card__content'
                    }
                }
            >
            </ReadMore>
        </div>
    );
}