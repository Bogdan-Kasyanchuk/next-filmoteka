import { MovieType } from '@/enums';

export const movieTypeFilter: Array<{
    label: string,
    value: MovieType
}> = [
    {
        label: 'Now playing',
        value: MovieType.NOW_PLAYING
    },
    {
        label: 'Popular',
        value: MovieType.POPULAR
    },
    {
        label: 'Top rated',
        value: MovieType.TOP_RATED
    },
    {
        label: 'Upcoming',
        value: MovieType.UPCOMING
    }
];