'use client';

import { ComponentProps, FocusEvent, MouseEvent, TouchEvent, useState } from 'react';

import { Link } from '@/services/i18n/navigation';

type Props = Omit<ComponentProps<typeof Link>, 'prefetch'>;

// Every page is dynamic, so the default viewport prefetch skips them;
// prefetch the full route (with data) only once the user shows intent
export default function PrefetchLink(props: Props) {
    const { onMouseEnter, onTouchStart, onFocus, ...rest } = props;

    const [ isIntended, setIsIntended ] = useState(false);

    return (
        <Link
            { ...rest }
            prefetch={ isIntended }
            onMouseEnter={
                (event: MouseEvent<HTMLAnchorElement>) => {
                    setIsIntended(true);
                    onMouseEnter?.(event);
                }
            }
            onTouchStart={
                (event: TouchEvent<HTMLAnchorElement>) => {
                    setIsIntended(true);
                    onTouchStart?.(event);
                }
            }
            onFocus={
                (event: FocusEvent<HTMLAnchorElement>) => {
                    setIsIntended(true);
                    onFocus?.(event);
                }
            }
        />
    );
}
