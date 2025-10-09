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

    const params = new URLSearchParams(searchParams);

    const handleType = (type: TVShowType) => {
        params.set('type', type);
        params.set('page', '1');

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