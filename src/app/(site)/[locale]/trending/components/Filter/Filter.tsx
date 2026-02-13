'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useExtracted } from 'next-intl';
import { useMemo } from 'react';

import Tabs from '@/components/ui/data-display/Tabs';
import { MediaType } from '@/enums';
import buildUrl from '@/utils/buildUrl';

type Filter = {
    label: string,
    value: 'all' | MediaType
};

type Props = {
    type: 'all' | MediaType
};

export default function Filter(props: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { push } = useRouter();

    const t = useExtracted();
    
    const filters: Filter[] = useMemo(() => {
        return [
            {
                label: t('All'),
                value: 'all'
            },
            {
                label: t('Movies'),
                value: MediaType.MOVIE
            },
            {
                label: t('TV Shows'),
                value: MediaType.TV_SHOW
            },
            {
                label: t('Persons'),
                value: MediaType.PERSON
            }
        ];
    }, [ t ]);

    const handleTypeChange = ( type: 'all' | MediaType) => {
        const params = new URLSearchParams(searchParams);

        params.set('type', type);

        const basePath = pathname.replace(/\/page\/[0-9]+$/, '');

        push(buildUrl(`${ basePath }/page/1`, params));
    };
    
    return (
        <div className="p-trending__filter">
            <Tabs<'all' | MediaType>
                tabs={ filters }
                active={ props.type }
                onClick={
                    value => {
                        handleTypeChange(value);
                    }
                }
            />
        </div>
    );
}