'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Tabs from '@/components/ui/data-display/Tabs';
import { TVShowType } from '@/enums';
import buildUrl from '@/utils/buildUrl';

import { tvShowTypeFilter } from './datasets';

type Props = {
    type: TVShowType
};

export default function Filter(props: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { push } = useRouter();

    const handleTypeChange = (type: TVShowType) => {
        const params = new URLSearchParams(searchParams);
        
        params.set('type', type);

        const basePath = pathname.replace(/\/page\/[0-9]+$/, '');

        push(buildUrl(`${ basePath }/page/1`, params));
    };

    return (
        <div className="p-tv-shows__filter">
            <Tabs<TVShowType>
                tabs={ tvShowTypeFilter }
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