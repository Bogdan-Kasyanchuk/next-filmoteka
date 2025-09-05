'use client';

import { useDebouncedCallback } from '@mantine/hooks';
import Image from 'next/image';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function Search() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const ref = useRef<HTMLInputElement>(null);

    const params = new URLSearchParams(searchParams);

    const handleSearch = useDebouncedCallback((term) => {
        if (term) {
            params.set('query', term);
            params.delete('page');
        } else {
            params.delete('query');
            params.delete('page');
        }

        replace(`${pathname}?${params.toString()}`);
    }, 250);

    const handleClear = () => {
        if (!ref.current) {
            return;
        }

        ref.current.value = '';

        params.delete('query');
        params.delete('page');

        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="p-search__search">
            <input
                ref={ref}
                type="text"
                name='search'
                defaultValue={searchParams.get('query')?.toString()}
                placeholder="Search movies, tv shows, persons"
                autoComplete='off'
                className="p-search__search-input"
                onChange={
                    (e) => {
                        handleSearch(e.target.value);
                    }
                }
            />

            <Image
                width={24}
                height={24}
                src="/svg/search.svg"
                alt="Search icon"
                className="absolute top-1/2 -translate-y-1/2 start-3"
            />

            {
                ref.current?.value &&
                <button
                    type="button"
                    aria-label='Clear search'
                    className="p-search__search-clear"
                    onClick={
                        () => {
                            handleClear();
                        }
                    }
                >
                    <Image
                        width={24}
                        height={24}
                        src="/svg/close.svg"
                        alt="Search icon"
                        className="pointer-events-none"
                    />
                </button>
            }
        </div>
    );
}
