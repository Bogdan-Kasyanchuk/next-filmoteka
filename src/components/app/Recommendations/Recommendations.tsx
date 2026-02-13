'use client';

import { useExtracted } from 'next-intl';
import { ReactNode } from 'react';

import Wrapper from './Wrapper';

type Props<T extends Record<string, any>> = {
    items: Array<T>,
    children: (item: T) => ReactNode,
    hasNextPage: boolean,
    isFetchingNextPage: boolean,
    fetchNextPage: () => void
};

export default function Recommendations<T extends Record<string, any>>(props: Props<T>) {
    const t = useExtracted();
        
    return (
        <Wrapper>
            <ul className="с-recommendations__list">
                {
                    props.items.map(
                        item => (
                            <li key={ item.id }>
                                {
                                    props.children(item)
                                }
                            </li>
                        )
                    )
                }
            </ul>

            {
                props.hasNextPage &&
                <button
                    type="button"
                    className="с-recommendations__load-more-button"
                    disabled = { props.isFetchingNextPage }
                    onClick={
                        () => {
                            props.fetchNextPage();
                        } 
                    }
                >
                    { props.isFetchingNextPage ? 'Loading...' : t('Load more') }
                </button>
            }
        </Wrapper>
    );
}