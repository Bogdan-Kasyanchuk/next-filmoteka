import { ReactNode } from 'react';
import { Mousewheel } from 'swiper/modules';
import { Swiper, type SwiperProps, SwiperSlide, type SwiperSlideProps } from 'swiper/react';

import type { SwiperModule } from 'swiper/types';

import 'swiper/css';

type Props<T> = {
    items: T[],
    children: (item: T) => ReactNode,
    className?: string,
    options?: Omit<SwiperProps, 'modules' | 'className'>,
    modules?: SwiperModule[],
    slideProps?: Omit<SwiperSlideProps, 'children'>
};

export default function SCarousel<T>(props: Props<T>) {
    return (
        <Swiper
            modules={[Mousewheel, ...(props.modules ?? [])]}
            className={props.className}
            slidesPerView="auto"
            lazyPreloadPrevNext={2}
            mousewheel={
                {
                    forceToAxis: true
                }
            }
            {...props.options}
        >
            {
                props.items.map(
                    (item, index) => (
                        <SwiperSlide
                            key={index}
                            {...props.slideProps}
                        >
                            {props.children(item)}
                        </SwiperSlide>
                    ))
            }
        </Swiper>
    );
}