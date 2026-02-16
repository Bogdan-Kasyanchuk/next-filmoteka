'use client';

import { useExtracted } from 'next-intl';

import { PLACEHOLDERS } from '@/datasets/placeholders';

import Wrapper from './Wrapper';

export default function Skeleton() {
    const t = useExtracted();
        
    return (
        <Wrapper>
            <div className="c-videos__list">
                {
                    [ 1, 2, 3, 4 ].map(
                        item => (
                            <div
                                key={ item }
                                className="c-videos__skeleton"
                            >
                                <div />

                                <img
                                    src={ PLACEHOLDERS[ '16x9' ] }
                                    alt={ t('Placeholder') }
                                    width={ 500 }
                                    height={ 282 }
                                />
                            </div>
                        )
                    )
                }
            </div>
        </Wrapper>
    );
}