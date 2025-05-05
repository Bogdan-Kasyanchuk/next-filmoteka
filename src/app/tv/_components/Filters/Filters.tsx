'use client';

import Tabs from '@/components/ui/data-display/Tabs';
import { TVType } from '@/enums';

import { tvTypeFilter } from './datasets';

export default function Filters() {
    return (
        <div className='p-tvs__filters'>
            <Tabs<TVType>
                filters={tvTypeFilter}
                active={TVType.TOP_RATED}
                onClick={(value) => { console.log(value); }}
            />
        </div>
    );
}