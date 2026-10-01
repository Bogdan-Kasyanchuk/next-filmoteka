'use client';

import clsx from 'clsx';
import { useExtracted } from 'next-intl';

import Icon from '@/components/ui/data-display/Icon';
import Link from '@/components/ui/navigation/PrefetchLink';
import buildUrl from '@/utils/buildUrl';

import { ELLIPSIS, desktopPagination, mobilePagination } from './generatePagination';

type Props = {
    currentPage: number,
    totalPages: number,
    path: string,
    query?: Record<string, string>
};

export default function Pagination(props: Props) {
    const t = useExtracted();

    const createPageURL = (page: number) => {
        const params = new URLSearchParams(props.query);

        return buildUrl(`${ props.path }/page/${ page }`, params);
    };

    // both sets are rendered and switched by CSS, so server and client markup match on any screen
    const renderPages = (pages: (number | string)[], variant: 'mobile' | 'desktop') => pages.map(
        (page, index) => (
            <li
                key={ `${ variant }-${ index }` }
                aria-hidden={ page === ELLIPSIS ? true : undefined }
                className={
                    clsx('c-pagination__item', `c-pagination__item--${ variant }`, {
                        'c-pagination__item--is-active': page === props.currentPage,
                        'pointer-events-none': page === ELLIPSIS
                    })
                }
            >
                {
                    typeof page === 'number'
                        ? <Link
                            href={ createPageURL(page) }
                            aria-current={ page === props.currentPage ? 'page' : undefined }
                        >
                            { page }
                        </Link>
                        : <>{ page }</>
                }
            </li>
        )
    );

    return (
        <nav
            aria-label={ t('Pagination') }
            className="c-pagination"
        >
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
                            ? <IconComponent />
                            : <Link
                                href={ createPageURL(props.currentPage - 1) }
                                aria-label={ t('Previous page') }
                            >
                                <IconComponent />
                            </Link>
                    }
                </li>

                { renderPages(mobilePagination(props.currentPage, props.totalPages), 'mobile') }
                { renderPages(desktopPagination(props.currentPage, props.totalPages), 'desktop') }

                <li
                    className={
                        clsx('c-pagination__item', {
                            'c-pagination__item--is-disabled': props.currentPage >= props.totalPages
                        })
                    }
                >
                    {
                        props.currentPage >= props.totalPages
                            ? <IconComponent />
                            : <Link
                                href={ createPageURL(props.currentPage + 1) }
                                aria-label={ t('Next page') }
                            >
                                <IconComponent />
                            </Link>
                    }
                </li>
            </ul>

            <div
                className="c-pagination__progress-bar"
                style={ { width: `${ props.currentPage / props.totalPages * 100 }%` } }
            />
        </nav>
    );
}

function IconComponent() {
    return (
        <Icon name="angle" />
    );
}