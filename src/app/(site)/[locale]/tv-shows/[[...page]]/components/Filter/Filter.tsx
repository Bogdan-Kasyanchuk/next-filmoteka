'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useExtracted } from 'next-intl';
import { useMemo } from 'react';

import Tabs from '@/components/ui/data-display/Tabs';
import { TVShowType } from '@/enums';
import buildUrl from '@/utils/buildUrl';

type Filter = {
    label: string,
    value: TVShowType
};

type Props = {
    type: TVShowType
};

export default function Filter(props: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { push } = useRouter();

    const t = useExtracted();

    const filters: Filter[] = useMemo(() => {
        return [
            {
                label: t('Airing today'),
                value: TVShowType.AIRING_TODAY
            },
            {
                label: t('On the air'),
                value: TVShowType.ON_THE_AIR
            },
            {
                label: t('Popular'),
                value: TVShowType.POPULAR
            },
            {
                label: t('Top rated'),
                value: TVShowType.TOP_RATED
            }
        ];
    }, [ t ]);

    const handleTypeChange = (type: TVShowType) => {
        const params = new URLSearchParams(searchParams);
        
        params.set('type', type);

        const basePath = pathname.replace(/\/page\/[0-9]+$/, '');

        push(buildUrl(`${ basePath }/page/1`, params));
    };

    return (
        <div className="p-tv-shows__filter">
            <Tabs<TVShowType>
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