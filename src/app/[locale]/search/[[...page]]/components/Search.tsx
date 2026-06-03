'use client';

import { useDebouncedValue, useDidUpdate } from '@mantine/hooks';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useExtracted, useLocale } from 'next-intl';
import { useRef, useState } from 'react';

import { pagesSearchUrl } from '@/routes';
import { getPathname } from '@/services/i18n/navigation';
import buildUrl from '@/utils/buildUrl';

export default function Search() {
    const searchParams = useSearchParams();
    const { push } = useRouter();
    const locale = useLocale();

    const t = useExtracted();
    
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

        push(buildUrl(`${ getPathname({ locale, href: pagesSearchUrl() }) }/page/1/`, params));
    }, [ debouncedTerm ]);

    return (
        <div className="p-search__search">
            <input
                ref={ inputRef }
                type="text"
                name="search"
                value={ term }
                placeholder={ t('Search movies, tv shows, persons') }
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
                alt={ t('Icon') }
                className="absolute top-1/2 -translate-y-1/2 start-[9px]"
                preload
                loading="eager"
                unoptimized
            />

            {
                term &&
                <button
                    type="button"
                    aria-label={ t('Clear search') }
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
                        alt={ t('Icon') }
                        className="pointer-events-none"
                        preload
                        loading="eager"
                        unoptimized
                    />
                </button>
            }
        </div>
    );
}
