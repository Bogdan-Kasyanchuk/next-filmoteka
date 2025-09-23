'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import Tabs from '@/components/ui/data-display/Tabs';
import { MovieType } from '@/enums';
import { sortSearchParams } from '@/helpers/sortSearchParams';

import { movieTypeFilter } from './datasets';

type Props = {
    type: MovieType;
}

export default function Filter(props: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const params = new URLSearchParams(searchParams);

    const handleType = (type: MovieType) => {
        params.set('type', type);
        params.set('page', '1');

        replace(sortSearchParams(pathname, params));
    };

    return (
        <div className='p-movies__filter'>
            <Tabs<MovieType>
                tabs={movieTypeFilter}
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