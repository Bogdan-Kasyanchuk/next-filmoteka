import { MediaType, TimeType } from '@/enums';

export const mediaTypeFilter: Array<{
    label: string,
    value: 'all' | MediaType
}> = [
        {
            label: 'All',
            value: 'all'
        },
        {
            label: 'Movies',
            value: MediaType.MOVIE
        },
        {
            label: 'TV Shows',
            value: MediaType.TV_SHOW
        }
    ];

export const timeFilter: Array<{
    label: string,
    value: TimeType
}> = [
        {
            label: 'Day',
            value: TimeType.DAY
        },
        {
            label: 'Week',
            value: TimeType.WEEK
        }
    ];