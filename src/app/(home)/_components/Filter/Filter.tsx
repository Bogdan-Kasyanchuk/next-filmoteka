'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Tabs from '@/components/ui/data-display/Tabs';
import { MediaType, TimeType } from '@/enums';
import buildUri from '@/utils/buildUri';

import { mediaTypeFilter, timeFilter } from './datasets';

type Props = {
    type: 'all' | MediaType,
    time: TimeType
};

export default function Filter(props: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleParamChange = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams);

        params.set(key, value);
        params.delete('page');
        
        replace(buildUri(pathname, params));
    };
    
    return (
        <div className="p-home__filter">
            <Tabs<'all' | MediaType>
                tabs={ mediaTypeFilter }
                active={ props.type }
                onClick={
                    value => {
                        handleParamChange('type', value);
                    }
                }
            />

            <Tabs<TimeType>
                tabs={ timeFilter }
                active={ props.time }
                onClick={
                    value => {
                        handleParamChange('time', value);
                    }
                }
            />
        </div>
    );
}