'use client';

import { useDidUpdate } from '@mantine/hooks';
import clsx from 'clsx';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { NAVIGATION_START_EVENT, isTrackedNavigation } from './startNavigationProgress';

type Status = 'idle' | 'loading' | 'done';

const HIDE_DELAY_MS = 500;
const STUCK_TIMEOUT_MS = 15_000;

const isPlainLeftClick = (event: MouseEvent) => event.button === 0
    && !event.metaKey
    && !event.ctrlKey
    && !event.shiftKey
    && !event.altKey;

export default function NavigationProgress() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [ status, setStatus ] = useState<Status>('idle');

    useEffect(() => {
        const start = () => {
            setStatus('loading');
        };

        // capture phase: next/link calls preventDefault() in its own click handler
        const handleClick = (event: MouseEvent) => {
            if (!isPlainLeftClick(event) || !(event.target instanceof Element)) {
                return;
            }

            const anchor = event.target.closest('a[href]');

            if (
                !(anchor instanceof HTMLAnchorElement)
                || (anchor.target && anchor.target !== '_self')
                || anchor.hasAttribute('download')
                || !isTrackedNavigation(anchor.href)
            ) {
                return;
            }

            start();
        };

        window.addEventListener('click', handleClick, true);
        window.addEventListener(NAVIGATION_START_EVENT, start);

        return () => {
            window.removeEventListener('click', handleClick, true);
            window.removeEventListener(NAVIGATION_START_EVENT, start);
        };
    }, []);

    useDidUpdate(() => {
        setStatus(current => current === 'loading' ? 'done' : current);
    }, [ pathname, searchParams ]);

    useEffect(() => {
        if (status === 'idle') {
            return;
        }

        const timeout = setTimeout(
            () => {
                setStatus(status === 'loading' ? 'done' : 'idle');
            },
            status === 'loading' ? STUCK_TIMEOUT_MS : HIDE_DELAY_MS
        );

        return () => {
            clearTimeout(timeout);
        };
    }, [ status ]);

    return (
        <div
            aria-hidden
            className={
                clsx(
                    'c-navigation-progress',
                    {
                        'c-navigation-progress--is-loading': status === 'loading',
                        'c-navigation-progress--is-done': status === 'done'
                    }
                )
            }
        />
    );
}
