import { MediaType } from '@/enums';

export const mediaTypeFilter: Array<{
    label: string,
    value: 'multi' | MediaType
}> = [
    {
        label: 'All',
        value: 'multi'
    },
    {
        label: 'Movies',
        value: MediaType.MOVIE
    },
    {
        label: 'TV Shows',
        value: MediaType.TV_SHOW
    },
    {
        label: 'Persons',
        value: MediaType.PERSON
    }
];