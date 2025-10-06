import clsx from 'clsx';
import { Dispatch, SetStateAction, useState } from 'react';
import { Autoplay, Navigation } from 'swiper/modules';

import CrewCard from '@/components/ui/cards/CrewCard';
import Carousel from '@/components/ui/data-display/Carousel';
import Icon from '@/components/ui/data-display/Icon';
import Title from '@/components/ui/typography/Title';
import { CrewMapper } from '@/types';

type Props = {
    crews: CrewMapper[]
};

export default function Crews(props: Props) {
    const [ prevButtonRef, setPrevButtonRef ] = useState<HTMLButtonElement | null>(null);
    const [ nextButtonRef, setNextButtonRef ] = useState<HTMLButtonElement | null>(null);

    return (
        <div className="с-crews">
            <Title
                order="h3"
                variant={ 3 }
                className="с-crews__title"
            >
                Crews
            </Title>

            <div className="с-crews__cards">
                <Carousel
                    items={ props.crews }
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
                            className: 'с-crews__slide'
                        }
                    }
                >
                    {
                        slide => <CrewCard crew={ slide } />
                    }
                </Carousel>

                <>
                    <Arrow
                        type="prev"
                        refEl={ setPrevButtonRef }
                    />
                    <Arrow
                        type="next"
                        refEl={ setNextButtonRef }
                    />
                </>
            </div>
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
            type="button"
            ref={ props.refEl }
            className={
                clsx(
                    'с-crews__arrow',
                    props.type === 'prev'
                        ? 'с-crews__arrow--prev'
                        : 'с-crews__arrow--next'

                )
            }
        >
            <Icon name="arrow" />
        </button>
    );
}