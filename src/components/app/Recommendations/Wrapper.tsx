'use client';

import { useExtracted } from 'next-intl';
import { PropsWithChildren } from 'react';

import Title from '@/components/ui/typography/Title';

export default function Wrapper(props: PropsWithChildren) {
    const t = useExtracted();
        
    return (
        <div className="c-recommendations">
            <Title
                order="h3"
                variant={ 3 }
                className="c-recommendations__title"
            >
                { t('Recommendations') }
            </Title>

            { props.children }
        </div>
    );
}