import { TVShowType } from '@/enums';

export const tvShowTypeFilter: Array<{
    label: string,
    value: TVShowType
}> = [
    {
        label: 'Airing today',
        value: TVShowType.AIRING_TODAY
    },
    {
        label: 'On the air',
        value: TVShowType.ON_THE_AIR
    },
    {
        label: 'Popular',
        value: TVShowType.POPULAR
    },
    {
        label: 'Top rated',
        value: TVShowType.TOP_RATED
    }
];