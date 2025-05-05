'use client';

import Tabs from '@/components/ui/data-display/Tabs';
import { MediaType, TimeType } from '@/enums';

import { mediaTypeFilter, timeFilter } from './datasets';

export default function Filters() {
    return (
        <div className='p-home__filters'>
            <Tabs<'all' | MediaType>
                filters={mediaTypeFilter}
                active={'all'}
                onClick={(value) => { console.log(value); }}
            />

            <Tabs<TimeType>
                filters={timeFilter}
                active={TimeType.DAY}
                onClick={(value) => { console.log(value); }}
            />
        </div>
    );
}