'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import Tabs from '@/components/ui/data-display/Tabs';
import { MediaType, TimeType } from '@/enums';
import { sortSearchParams } from '@/helpers/sortSearchParams';

import { mediaTypeFilter, timeFilter } from './datasets';

type Props = {
    type: 'all' | MediaType;
    time: TimeType;
}

export default function Filter(props: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const params = new URLSearchParams(searchParams);

    const handleType = (type: 'all' | MediaType) => {
        params.set('type', type);
        params.set('page', '1');

        replace(sortSearchParams(pathname, params));
    };

    const handleTime = (time: TimeType) => {
        params.set('time', time);
        params.set('page', '1');

        replace(sortSearchParams(pathname, params));
    };

    return (
        <div className='p-home__filter'>
            <Tabs<'all' | MediaType>
                tabs={mediaTypeFilter}
                active={props.type}
                onClick={
                    (value) => {
                        handleType(value);
                    }
                }
            />

            <Tabs<TimeType>
                tabs={timeFilter}
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