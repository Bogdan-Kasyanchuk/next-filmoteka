'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import Tabs from '@/components/ui/data-display/Tabs';
import { TVShowType } from '@/enums';
import { sortParams } from '@/helpers/sortParams';

import { tvShowTypeFilter } from './datasets';

type Props = {
    type: TVShowType;
}

export default function Filter(props: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleType = (type: TVShowType) => {
        const params = new URLSearchParams(searchParams);

        params.set('type', type);
        params.set('page', '1');

        replace(sortParams(pathname, params));
    };

    return (
        <div className='p-tv-shows__filter'>
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