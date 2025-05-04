import { TVType } from '@/enums';

export const tvTypeFilter: Array<{
    label: string,
    value: TVType
}> = [
        {
            label: 'Airing today',
            value: TVType.AIRING_TODAY
        },
        {
            label: 'On the air',
            value: TVType.ON_THE_AIR
        },
        {
            label: 'popular',
            value: TVType.POPULAR
        },
        {
            label: 'Top rated',
            value: TVType.TOP_RATED
        }
    ];