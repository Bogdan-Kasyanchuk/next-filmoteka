'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { Autoplay, Navigation } from 'swiper/modules';

import Carousel from '@/components/ui/data-display/Carousel';
import Icon from '@/components/ui/data-display/Icon';
import Title from '@/components/ui/typography/Title';

type Props<T> = {
    recommendations: {
        items: T[],
        totalPages: number,
    },
    item: (item: T) => ReactNode,
    showAllPath: string;
}

export default function Recommendations<T>(props: Props<T>) {
    const [prevButtonRef, setPrevButtonRef] = useState<HTMLButtonElement | null>(null);
    const [nextButtonRef, setNextButtonRef] = useState<HTMLButtonElement | null>(null);

    return (
        <div className='с-recommendations'>
            <Title
                order='h3'
                variant={3}
                className='с-recommendations__title'
            >
                Recommendations
            </Title>

            <div className='с-recommendations__cards'>
                <Carousel
                    items={props.recommendations.items}
                    modules={[Autoplay, Navigation]}
                    options={
                        {
                            autoplay: {
                                delay: 2000,
                                disableOnInteraction: true,
                                pauseOnMouseEnter: true
                            },
                            navigation: {
                                prevEl: prevButtonRef,
                                nextEl: nextButtonRef
                            }
                        }
                    }
                    slideProps={
                        {
                            className: 'с-recommendations__slide'
                        }
                    }
                >
                    {
                        slide => props.item(slide)
                    }
                </Carousel>

                <>
                    <Arrow
                        type='prev'
                        refEl={setPrevButtonRef}
                    />
                    <Arrow
                        type='next'
                        refEl={setNextButtonRef}
                    />
                </>
            </div>

            {
                props.recommendations.totalPages > 1 &&
                <Link
                    href={props.showAllPath}
                    className='с-recommendations__show-all-button'
                >
                    Show all recommendations
                </Link>
            }
        </div>
    );
}

export type ArrowProps = {
    type: 'prev' | 'next',
    refEl: Dispatch<SetStateAction<HTMLButtonElement | null>>
};

function Arrow(props: ArrowProps) {
    return (
        <button
            type='button'
            ref={props.refEl}
            className={
                clsx(
                    'с-recommendations__arrow',
                    props.type === 'prev'
                        ? 'с-recommendations__arrow--prev'
                        : 'с-recommendations__arrow--next'

                )
            }
        >
            <Icon name='arrow' />
        </button>
    );
}