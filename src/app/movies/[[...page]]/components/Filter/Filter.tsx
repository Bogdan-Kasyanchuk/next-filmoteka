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
    const { push } = useRouter();
    
    const handleTypeChange = (type: MovieType) => {
        const params = new URLSearchParams(searchParams);
        
        params.set('type', type);

        const basePath = pathname.replace(/\/page\/[0-9]+$/, '');

        push(buildUri(`${ basePath }/page/1`, params));
    };

    return (
        <div className="p-movies__filter">
            <Tabs<MovieType>
                tabs={ movieTypeFilter }
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