'use client';

import { useWindowScroll } from '@mantine/hooks';

import Icon from '@/components/ui/data-display/Icon';

export default function ButtonScrollToTop() {
    const [ scroll, scrollTo ] = useWindowScroll();

    return (
        scroll.y > 1000 &&
        <button
            type="button"
            aria-label="Scroll to top"
            className="c-scroll-to-top"
            onClick={
                () => {
                    scrollTo({ y: 0 });
                }
            }
        >
            <Icon name="arrow" />
        </button>
    );
}
