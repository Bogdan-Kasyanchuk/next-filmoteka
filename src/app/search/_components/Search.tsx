'use client';

import { useDebouncedCallback } from '@mantine/hooks';
import Image from 'next/image';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set('query', term);
            params.delete('page');
        } else {
            params.delete('query');
            params.delete('page');
        }

        replace(`${pathname}?${params.toString()}`);
    }, 500);

    return (
        <div className="p-search__search">
            <input
                type="text"
                name='search'
                defaultValue={searchParams.get('query')?.toString()}
                placeholder="Search movies, tv shows"
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
                className="absolute top-1/2 -translate-y-1/2 left-3"
            />
        </div>
    );
}
