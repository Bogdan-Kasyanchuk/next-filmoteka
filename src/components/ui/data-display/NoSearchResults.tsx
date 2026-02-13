'use client';

import Image from 'next/image';
import { useExtracted } from 'next-intl';

export default function NoSearchResults() {
    const t = useExtracted();
        
    return (
        <div className="c-no-search-results">
            <Image
                width={ 80 }
                height={ 80 }
                src="/svg/search.svg"
                alt={ t('Search icon') }
                unoptimized
            />

            <p className="c-no-search-results__title">
                { t('No search results.') }
            </p>
            
            <p className="c-no-search-results__text">
                { t('We could not find what you searched for. Try searching again.') }
            </p>
        </div>
    );
}