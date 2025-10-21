'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Tabs from '@/components/ui/data-display/Tabs';
import { MovieType } from '@/enums';
import buildUri from '@/utils/buildUri';

import { movieTypeFilter } from './datasets';

type Props = {
    type: MovieType
};

export default function Filter(props: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    
    const handleType = (type: MovieType) => {
        const params = new URLSearchParams(searchParams);
        
        params.set('type', type);
        params.delete('page');

        replace(buildUri(pathname, params));
    };

    return (
        <div className="p-movies__filter">
            <Tabs<MovieType>
                tabs={ movieTypeFilter }
                active={ props.type }
                onClick={
                    value => {
                        handleType(value);
                    }
                }
            />
        </div>
    );
}