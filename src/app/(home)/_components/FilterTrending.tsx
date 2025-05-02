'use client';

import FilterBar from '@/components/ui/data-display/FilterBar';
import { ResourceType, TimeType } from '@/enums';

const resourcesFilter = [
    {
        label: 'All',
        value: 'all'
    },
    {
        label: 'Movies',
        value: ResourceType.MOVIE
    },
    {
        label: 'TV Shows',
        value: ResourceType.TV
    }
];

const timesFilter = [
    {
        label: 'Day',
        value: TimeType.DAY
    },
    {
        label: 'Week',
        value: TimeType.WEEK
    }
];

export default function FilterTrending() {
    return (
        <div className='p-home__filter-trending'>
            <FilterBar
                filters={resourcesFilter}
                onClick={(value) => { console.log(value); }}
            />

            <FilterBar
                filters={timesFilter}
                onClick={(value) => { console.log(value); }}
            />
        </div>
    );
}