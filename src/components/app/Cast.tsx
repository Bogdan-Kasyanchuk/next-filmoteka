'use client';

import clsx from 'clsx';
import { useExtracted } from 'next-intl';
import { Dispatch, SetStateAction, useState } from 'react';
import { Autoplay, Navigation } from 'swiper/modules';

import CastCard from '@/components/ui/cards/CastCard';
import Carousel from '@/components/ui/data-display/Carousel';
import Icon from '@/components/ui/data-display/Icon';
import Title from '@/components/ui/typography/Title';
import { CastMapper } from '@/types';

type Props = {
    cast: CastMapper[]
};

export default function Cast(props: Props) {
    const t = useExtracted();
        
    const [ prevButtonRef, setPrevButtonRef ] = useState<HTMLButtonElement | null>(null);
    const [ nextButtonRef, setNextButtonRef ] = useState<HTMLButtonElement | null>(null);

    return (
        <div className="c-persons">
            <Title
                order="h3"
                variant={ 3 }
                className="c-persons__title"
            >
                { t('Cast') }
            </Title>

            <div className="c-persons__cards">
                <Carousel
                    items={ props.cast }
                    modules={ [ Autoplay, Navigation ] }
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
                            className: 'c-persons__slide'
                        }
                    }
                >
                    {
                        slide => <CastCard cast={ slide } />
                    }
                </Carousel>

                <>
                    <Arrow
                        type="prev"
                        ariaLabel={ t('Previous') }
                        refEl={ setPrevButtonRef }
                    />
                    <Arrow
                        type="next"
                        ariaLabel={ t('Next') }
                        refEl={ setNextButtonRef }
                    />
                </>
            </div>
        </div>
    );
}

export type ArrowProps = {
    type: 'prev' | 'next',
    ariaLabel: string,
    refEl: Dispatch<SetStateAction<HTMLButtonElement | null>>
};

function Arrow(props: ArrowProps) {
    return (
        <button
            type="button"
            ref={ props.refEl }
            aria-label={ props.ariaLabel }
            className={
                clsx(
                    'c-persons__arrow',
                    props.type === 'prev'
                        ? 'c-persons__arrow--prev'
                        : 'c-persons__arrow--next'

                )
            }
        >
            <Icon name="arrow" />
        </button>
    );
}