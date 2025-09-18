import clsx from 'clsx';
import { Dispatch, SetStateAction, useState } from 'react';
import { Autoplay, Navigation } from 'swiper/modules';

import CastCard from '@/components/ui/cards/CastCard';
import Title from '@/components/ui/typography/Title';
import { CastMapper } from '@/types';

import Carousel from '../ui/data-display/Carousel';
import Icon from '../ui/data-display/Icon';

type Props = {
    casts: CastMapper[];
}

export default function Casts(props: Props) {
    const [prevButtonRef, setPrevButtonRef] = useState<HTMLButtonElement | null>(null);
    const [nextButtonRef, setNextButtonRef] = useState<HTMLButtonElement | null>(null);

    return (
        <div className='с-casts'>
            <Title
                order='h3'
                variant={3}
                className='с-casts__title'
            >
                Casts
            </Title>

            <div className='с-casts__cards'>
                <Carousel
                    items={props.casts}
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
                            className: 'с-casts__slide'
                        }
                    }
                >
                    {
                        slide => <CastCard cast={slide} />
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
        </div >
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
                    'с-casts__arrow',
                    props.type === 'prev'
                        ? 'с-casts__arrow--prev'
                        : 'с-casts__arrow--next'

                )
            }
        >
            <Icon name='arrow' />
        </button>
    );
}