'use client';

import { useMediaQuery, useToggle } from '@mantine/hooks';
import clsx from 'clsx';
import { useExtracted } from 'next-intl';

type Props = {
    text: string,
    maxChars: {
        mobile: number,
        tablet: number,
        desktop: number
    },
    classNames?: {
        root?: string,
        text?: string,
        button?: string
    }
};

export default function ReadMore(props: Props) {
    const t = useExtracted();
        
    const [ value, toggle ] = useToggle([ false, true ]);

    const isMobile = useMediaQuery(
        '(max-width: 767px)',
        false,
        { getInitialValueInEffect: false }
    );

    const isTablet = useMediaQuery(
        '(min-width: 768px) and (max-width: 1319px)',
        false,
        { getInitialValueInEffect: false }
    );

    const normalizedMaxChars = isMobile
        ? props.maxChars.mobile
        : isTablet
            ? props.maxChars.tablet
            : props.maxChars.desktop;

    if (props.text.length <= normalizedMaxChars) {
        return (
            <div className={ clsx('c-read-more', props.classNames?.root) }>
                <p className={ clsx('c-read-more__text', props.classNames?.text) }>
                    { props.text }
                </p>
            </div>
        );
    }

    return (
        <div className={ clsx('c-read-more', props.classNames?.root) }>
            <p className={ clsx('c-read-more__text', props.classNames?.text) }>
                { value ? props.text : `${ props.text.slice(0, normalizedMaxChars) }...` }
            </p>

            {
                props.text.length > normalizedMaxChars &&
                <button
                    type="button"
                    className="c-read-more__button"
                    onClick={
                        () => {
                            toggle();
                        }
                    }
                >
                    { value ? t('Read less') : t('Read more') }
                </button>
            }
        </div>
    );
}
