'use client';

import FilterBar from '@/components/ui/data-display/FilterBar';
import { MediaType, TimeType } from '@/enums';

import { mediaTypeFilter, timeFilter } from './datasets';

export default function Filters() {
    return (
        <div className='p-home__filters'>
            <FilterBar<'all' | MediaType>
                filters={mediaTypeFilter}
                active={MediaType.MOVIE}
                onClick={(value) => { console.log(value); }}
            />

            <FilterBar<TimeType>
                filters={timeFilter}
                active={TimeType.DAY}
                onClick={(value) => { console.log(value); }}
            />
        </div>
    );
}