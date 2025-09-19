'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import Tabs from '@/components/ui/data-display/Tabs';
import { MediaType } from '@/enums';
import { sortParams } from '@/helpers/sortParams';

import { mediaTypeFilter } from './datasets';

type Props = {
    type: 'multi' | MediaType;
}

export default function Filter(props: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleType = (type: 'multi' | MediaType) => {
        const params = new URLSearchParams(searchParams);

        params.set('type', type);
        params.set('page', '1');

        replace(sortParams(pathname, params));
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
        </div>
    );
}