'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import Tabs from '@/components/ui/data-display/Tabs';
import { MovieType } from '@/enums';

import { movieTypeFilter } from './datasets';

type Props = {
    type: MovieType;
}

export default function Filters(props: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleType = (type: MovieType) => {
        const params = new URLSearchParams(searchParams);

        params.set('type', type);
        params.set('page', '1');

        params.sort();

        replace(`${pathname}?${params.toString().split('&').reverse().join('&')}`);
    };

    return (
        <div className='p-movies__filters'>
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