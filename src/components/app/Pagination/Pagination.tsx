'use client';

import { useMediaQuery } from '@mantine/hooks';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

import Icon from '@/components/ui/data-display/Icon';
import buildUrl from '@/utils/buildUrl';

import { ELLIPSIS, desktopPagination, mobilePagination } from './generatePagination';

type Props = {
    currentPage: number,
    totalPages: number
};

export default function Pagination(props: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createPageURL = (page: number) => {
        const params = new URLSearchParams(searchParams);
        
        const basePath = pathname.replace(/\/page\/[0-9]+$/, '');

        return buildUrl(`${ basePath }/page/${ page }`, params);
    };

    const isMobile = useMediaQuery(
        '(max-width: 767px)',
        false,
        { getInitialValueInEffect: false }
    );

    const generatedAllPages = useMemo(() => {
        return isMobile
            ? mobilePagination(props.currentPage, props.totalPages)
            : desktopPagination(props.currentPage, props.totalPages);
    }, [ props.currentPage, props.totalPages, isMobile ]);

    const icon = <Icon name="angle" />;

    return (
        <div className="c-pagination">
            <ul className="c-pagination__list">
                <li
                    className={
                        clsx('c-pagination__item', {
                            'c-pagination__item--is-disabled': props.currentPage <= 1
                        })
                    }
                >
                    {
                        props.currentPage <= 1
                            ? <>{ icon }</>
                            : <Link
                                href={ createPageURL(props.currentPage - 1) }
                                aria-label="Previous page"
                            >
                                { icon }
                            </Link>
                    }
                </li>

                {
                    generatedAllPages.map(
                        (page, index) => (
                            <li
                                key={ index }
                                className={
                                    clsx('c-pagination__item', {
                                        'c-pagination__item--is-active': page === props.currentPage,
                                        'pointer-events-none': page === ELLIPSIS
                                    })
                                }
                            >
                                {
                                    typeof page === 'number'
                                        ? <Link href={ createPageURL(page) }>
                                            { page }
                                        </Link>
                                        : <>{ page }</>
                                }
                            </li>
                        ))
                }

                <li
                    className={
                        clsx('c-pagination__item', {
                            'c-pagination__item--is-disabled': props.currentPage >= props.totalPages
                        })
                    }
                >
                    {
                        props.currentPage >= props.totalPages
                            ? <>{ icon }</>
                            : <Link
                                href={ createPageURL(props.currentPage + 1) }
                                aria-label="Next page"
                            >
                                { icon }
                            </Link>
                    }
                </li>
            </ul>

            <div
                className="c-pagination__progress-bar"
                style={ { width: `${ props.currentPage / props.totalPages * 100 }%` } }
            />
        </div>
    );
}