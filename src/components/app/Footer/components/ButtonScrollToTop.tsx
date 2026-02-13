'use client';

import { useWindowScroll } from '@mantine/hooks';
import { useExtracted } from 'next-intl';

import Icon from '@/components/ui/data-display/Icon';

export default function ButtonScrollToTop() {
    const t = useExtracted();
        
    const [ scroll, scrollTo ] = useWindowScroll();

    return (
        scroll.y > 1000 &&
        <button
            type="button"
            aria-label={ t('Scroll to top') }
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
