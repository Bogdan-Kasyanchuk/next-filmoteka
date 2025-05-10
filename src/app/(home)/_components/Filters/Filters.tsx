'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import Tabs from '@/components/ui/data-display/Tabs';
import { MediaType, TimeType } from '@/enums';

import { mediaTypeFilter, timeFilter } from './datasets';

type Props = {
    type: 'all' | MediaType;
    time: TimeType;
}

export default function Filters(props: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleType = (type: 'all' | MediaType) => {
        const params = new URLSearchParams(searchParams);

        params.set('type', type);
        params.set('page', '1');

        params.sort();

        replace(`${pathname}?${params.toString().split('&').reverse().join('&')}`);
    };

    const handleTime = (time: TimeType) => {
        const params = new URLSearchParams(searchParams);

        params.set('time', time);
        params.set('page', '1');

        params.sort();

        replace(`${pathname}?${params.toString().split('&').reverse().join('&')}`);
    };

    return (
        <div className='p-home__filters'>
            <Tabs<'all' | MediaType>
                filters={mediaTypeFilter}
                active={props.type}
                onClick={
                    (value) => {
                        handleType(value);
                    }
                }
            />

            <Tabs<TimeType>
                filters={timeFilter}
                active={props.time}
                onClick={
                    (value) => {
                        handleTime(value);
                    }
                }
            />
        </div>
    );
}