'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import Tabs from '@/components/ui/data-display/Tabs';
import { TVType } from '@/enums';

import { tvTypeFilter } from './datasets';

type Props = {
    type: TVType;
}

export default function Filters(props: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleType = (type: TVType) => {
        const params = new URLSearchParams(searchParams);

        params.set('type', type);
        params.set('page', '1');

        params.sort();

        replace(`${pathname}?${params.toString().split('&').reverse().join('&')}`);
    };

    return (
        <div className='p-tvs__filters'>
            <Tabs<TVType>
                filters={tvTypeFilter}
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