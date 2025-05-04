'use client';

import FilterBar from '@/components/ui/data-display/FilterBar';
import { MovieType } from '@/enums';

import { movieTypeFilter } from './datasets';

export default function Filters() {
    return (
        <div className='p-movies__filters'>
            <FilterBar<MovieType>
                filters={movieTypeFilter}
                active={MovieType.POPULAR}
                onClick={(value) => { console.log(value); }}
            />
        </div>
    );
}