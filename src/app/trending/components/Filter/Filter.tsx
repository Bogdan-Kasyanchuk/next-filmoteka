'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Tabs from '@/components/ui/data-display/Tabs';
import { MediaType } from '@/enums';
import buildUri from '@/utils/buildUri';

import { mediaTypeFilter } from './datasets';

type Props = {
    type: 'all' | MediaType
};

export default function Filter(props: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { push } = useRouter();

    const handleTypeChange = ( type: 'all' | MediaType) => {
        const params = new URLSearchParams(searchParams);

        params.set('type', type);

        const basePath = pathname.replace(/\/page\/[0-9]+$/, '');

        push(buildUri(`${ basePath }/page/1`, params));
    };
    
    return (
        <div className="p-trending__filter">
            <Tabs<'all' | MediaType>
                tabs={ mediaTypeFilter }
                active={ props.type }
                onClick={
                    value => {
                        handleTypeChange(value);
                    }
                }
            />
        </div>
    );
}