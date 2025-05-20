'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import Tabs from '@/components/ui/data-display/Tabs';
import { TVShowType } from '@/enums';

import { tvShowTypeFilter } from './datasets';

type Props = {
    type: TVShowType;
}

export default function Filters(props: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleType = (type: TVShowType) => {
        const params = new URLSearchParams(searchParams);

        params.set('type', type);
        params.set('page', '1');

        params.sort();

        replace(`${pathname}?${params.toString().split('&').reverse().join('&')}`);
    };

    return (
        <div className='p-tv-shows__filters'>
            <Tabs<TVShowType>
                tabs={tvShowTypeFilter}
                active={props.type}
                onClick={
                    (value) => {
                        handleType(value);
                    }
                }
            />
        </div>
    );
}