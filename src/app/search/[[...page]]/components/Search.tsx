'use client';

import { useDebouncedValue, useDidUpdate } from '@mantine/hooks';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';

import buildUri from '@/utils/buildUri';

export default function Search() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { push } = useRouter();
    
    const [ term, setTerm ] = useState(searchParams.get('query') ?? '');
    const [ debouncedTerm ] = useDebouncedValue(term, 250);

    const inputRef = useRef<HTMLInputElement>(null);
    
    useDidUpdate(() => {
        const params = new URLSearchParams(searchParams);
        
        if (debouncedTerm) {
            params.set('query', debouncedTerm);
        } else {
            params.delete('query');
        }

        const basePath = pathname.replace(/\/page\/[0-9]+$/, '');

        push(buildUri(`${ basePath }/page/1`, params));
    }, [ debouncedTerm ]);

    return (
        <div className="p-search__search">
            <input
                ref={ inputRef }
                type="text"
                name="search"
                value={ term }
                placeholder="Search movies, tv shows, persons"
                autoComplete="off"
                className="p-search__search-input"
                onChange={
                    e => {
                        setTerm(e.target.value);
                    }
                }
            />

            <Image
                width={ 20 }
                height={ 20 }
                src="/svg/search.svg"
                alt="Search icon"
                className="absolute top-1/2 -translate-y-1/2 start-[9px]"
            />

            {
                term &&
                <button
                    type="button"
                    aria-label="Clear search"
                    className="p-search__search-clear"
                    onClick={
                        () => {
                            setTerm('');
                            inputRef.current?.focus();
                        }
                    }
                >
                    <Image
                        width={ 20 }
                        height={ 20 }
                        src="/svg/close.svg"
                        alt="Close icon"
                        className="pointer-events-none"
                    />
                </button>
            }
        </div>
    );
}
