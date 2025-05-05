'use client';

import Tabs from '@/components/ui/data-display/Tabs';
import { MovieType } from '@/enums';

import { movieTypeFilter } from './datasets';

export default function Filters() {
    return (
        <div className='p-movies__filters'>
            <Tabs<MovieType>
                filters={movieTypeFilter}
                active={MovieType.POPULAR}
                onClick={(value) => { console.log(value); }}
            />
        </div>
    );
}