import Image from 'next/image';

export default function NoSearchResults() {
    return (
        <div className="c-no-search-results">
            <Image
                width={ 80 }
                height={ 80 }
                src="/svg/search.svg"
                alt="Search icon"
            />

            <p className="c-no-search-results__title">
                No search results
            </p>
            
            <p className="c-no-search-results__text">
                We couldn&apos;t find what you searched for. Try searching again.
            </p>
        </div>
    );
}