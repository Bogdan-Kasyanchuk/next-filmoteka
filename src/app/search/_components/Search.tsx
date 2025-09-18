'use client';

import { useDebouncedValue } from '@mantine/hooks';
import Image from 'next/image';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

export default function Search() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const params = useMemo(
        () => new URLSearchParams(searchParams),
        [searchParams]
    );

    const [term, setTerm] = useState(searchParams.get('query')?.toString() ?? '');
    const [debouncedTerm] = useDebouncedValue(term, 250);

    useEffect(() => {
        if (debouncedTerm) {
            params.set('query', debouncedTerm);
            params.delete('page');
        } else {
            params.delete('query');
            params.delete('page');
        }

        replace(`${pathname}?${params.toString()}`);
    }, [debouncedTerm, params, pathname, replace]);

    return (
        <div className='p-search__search'>
            <input
                type='text'
                name='search'
                value={term}
                placeholder='Search movies, tv shows, persons'
                autoComplete='off'
                className='p-search__search-input'
                onChange={
                    (e) => {
                        setTerm(e.target.value);
                    }
                }
            />

            <Image
                width={24}
                height={24}
                src='/svg/search.svg'
                alt='Search icon'
                className='absolute top-1/2 -translate-y-1/2 start-3'
            />

            {
                debouncedTerm &&
                <button
                    type='button'
                    aria-label='Clear search'
                    className='p-search__search-clear'
                    onClick={
                        () => {
                            setTerm('');
                        }
                    }
                >
                    <Image
                        width={24}
                        height={24}
                        src='/svg/close.svg'
                        alt='Search icon'
                        className='pointer-events-none'
                    />
                </button>
            }
        </div>
    );
}
