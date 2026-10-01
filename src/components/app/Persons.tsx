'use client';

import clsx from 'clsx';
import { useExtracted } from 'next-intl';
import { Dispatch, FocusEvent, ReactNode, SetStateAction, useRef, useState } from 'react';
import { Autoplay, Navigation } from 'swiper/modules';

import Carousel from '@/components/ui/data-display/Carousel';
import Icon from '@/components/ui/data-display/Icon';
import Title from '@/components/ui/typography/Title';

import type { Swiper } from 'swiper/types';

type Props<T extends Record<string, any>> = {
    items: Array<T>,
    children: (item: T) => ReactNode,
    title: string
};

export default function Persons<T extends Record<string, any>>(props: Props<T>) {
    const t = useExtracted();
        
    const [ prevButtonRef, setPrevButtonRef ] = useState<HTMLButtonElement | null>(null);
    const [ nextButtonRef, setNextButtonRef ] = useState<HTMLButtonElement | null>(null);
    const [ swiper, setSwiper ] = useState<Swiper | null>(null);
    const isStoppedByFocus = useRef(false);

    // autoplay must not run for people who asked for less motion, and must not move slides away from keyboard focus
    const handleSwiper = (instance: Swiper) => {
        setSwiper(instance);

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            instance.autoplay.stop();
        }
    };

    const handleFocus = () => {
        if (swiper?.autoplay.running) {
            swiper.autoplay.stop();
            isStoppedByFocus.current = true;
        }
    };

    const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
        if (isStoppedByFocus.current && !event.currentTarget.contains(event.relatedTarget)) {
            swiper?.autoplay.start();
            isStoppedByFocus.current = false;
        }
    };

    return (
        <div className="c-persons">
            <Title
                order="h3"
                variant={ 3 }
                className="c-persons__title"
            >
                { props.title }
            </Title>

            <div
                className="c-persons__cards"
                onFocus={ handleFocus }
                onBlur={ handleBlur }
            >
                <Carousel
                    items={ props.items }
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
                            },
                            onSwiper: handleSwiper
                        }
                    }
                    slideProps={
                        {
                            className: 'c-persons__slide'
                        }
                    }
                >
                    {
                        slide => props.children(slide)
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