'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import Tabs from '@/components/ui/data-display/Tabs';
import Switch from '@/components/ui/inputs/Switch';
import { MediaType } from '@/enums';
import { sortSearchParams } from '@/helpers/sortSearchParams';
import { Adult } from '@/types';

import { mediaTypeFilter } from './datasets';

type Props = {
    type: 'multi' | MediaType;
    adult: Adult;
}

export default function Filter(props: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const params = new URLSearchParams(searchParams);

    const handleType = (type: 'multi' | MediaType) => {
        params.set('type', type);
        params.set('page', '1');

        replace(sortSearchParams(pathname, params));
    };

    const handleAdult = (adult: Adult) => {
        params.set('adult', adult);
        params.set('page', '1');

        replace(sortSearchParams(pathname, params));
    };

    return (
        <div className='p-search__filter'>
            <Tabs<'multi' | MediaType>
                tabs={mediaTypeFilter}
                active={props.type}
                onClick={
                    (value) => {
                        handleType(value);
                    }
                }
            />

            <Switch
                label='Adult'
                checked={props.adult === 'true'}
                onChange={
                    event => {
                        handleAdult(
                            event.currentTarget.checked ? 'true' : 'false'
                        );
                    }
                }
            />
        </div>
    );
}