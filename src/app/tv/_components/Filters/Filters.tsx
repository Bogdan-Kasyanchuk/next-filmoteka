'use client';

import FilterBar from '@/components/ui/data-display/FilterBar';
import { TVType } from '@/enums';

import { tvTypeFilter } from './datasets';

export default function Filters() {
    return (
        <div className='p-tvs__filters'>
            <FilterBar<TVType>
                filters={tvTypeFilter}
                active={TVType.TOP_RATED}
                onClick={(value) => { console.log(value); }}
            />
        </div>
    );
}