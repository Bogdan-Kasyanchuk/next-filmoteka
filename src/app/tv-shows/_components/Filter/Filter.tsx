'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Tabs from '@/components/ui/data-display/Tabs';
import { TVShowType } from '@/enums';
import buildUri from '@/utils/buildUri';

import { tvShowTypeFilter } from './datasets';

type Props = {
    type: TVShowType
};

export default function Filter(props: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleType = (type: TVShowType) => {
        const params = new URLSearchParams(searchParams);
        
        params.set('type', type);
        params.delete('page');

        replace(buildUri(pathname, params));
    };

    return (
        <div className="p-tv-shows__filter">
            <Tabs<TVShowType>
                tabs={ tvShowTypeFilter }
                active={ props.type }
                onClick={
                    value => {
                        handleType(value);
                    }
                }
            />
        </div>
    );
}