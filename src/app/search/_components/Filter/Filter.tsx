'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Tabs from '@/components/ui/data-display/Tabs';
import Switch from '@/components/ui/inputs/Switch';
import { MediaType } from '@/enums';
import { Adult } from '@/types';
import buildUri from '@/utils/buildUri';

import { mediaTypeFilter } from './datasets';

type Props = {
    type: 'multi' | MediaType,
    adult: Adult
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
        <div className="p-search__filter">
            <Tabs<'multi' | MediaType>
                tabs={ mediaTypeFilter }
                active={ props.type }
                onClick={
                    value => {
                        handleParamChange('type', value);
                    }
                }
            />

            <Switch
                label="Adult"
                checked={ props.adult === 'true' }
                onChange={
                    event => {
                        handleParamChange(
                            'adult',
                            event.currentTarget.checked ? 'true' : 'false'
                        );
                    }
                }
            />
        </div>
    );
}