'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import generatePagination from '@/utils/generatePagination';

import Icon from './Icon';

type Props = {
    currentPage: number,
    totalPages: number
}

export default function Pagination(props: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const allPages = generatePagination(props.currentPage, props.totalPages);

    const createPageURL = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        return `${pathname}?${params.toString()}`;
    };

    const icon = <Icon
        type='mono'
        name='angle'
    />;

    return (
        <ul className="inline-flex items-center gap-x-2.5">
            <li className="leading-none w-10 h-10 flex items-center justify-center rounded-xs bg-primary shrink-0">
                {
                    props.currentPage <= 1
                        ? <>{icon}</>
                        : <Link href={createPageURL(props.currentPage - 1)}>
                            {icon}
                        </Link>
                }
            </li>

            {
                allPages.map(
                    (page, index) => (
                        <li
                            key={index}
                            className="leading-none w-10 h-10 text-xs font-bold flex items-center justify-center rounded-xs bg-primary shrink-0"
                        >
                            {
                                typeof page === 'number' && page !== props.currentPage
                                    ? <Link href={createPageURL(page)}>
                                        {page}
                                    </Link>
                                    : <>{page}</>
                            }
                        </li>
                    ))
            }

            <li className="leading-none w-10 h-10 flex items-center justify-center rounded-xs bg-primary shrink-0">
                {
                    props.currentPage >= props.totalPages
                        ? <>{icon}</>
                        : <Link href={createPageURL(props.currentPage + 1)}>
                            {icon}
                        </Link>
                }
            </li>
        </ul>
    );
}
