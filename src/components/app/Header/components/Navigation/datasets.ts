import { pagesMoviesUrl, pagesPersonsUrl, pagesSearchUrl, pagesTVShowsUrl } from '@/routes';

import { TitleKeys } from './enums';

export const LINKS = [
    {
        key: TitleKeys.SEARCH,
        href: pagesSearchUrl(),
        icon: '/svg/search.svg'
    },
    {
        key: TitleKeys.MOVIES,
        href: pagesMoviesUrl(),
        icon: '/svg/movie.svg'
    },
    {
        key: TitleKeys.TV_SHOWS,
        href: pagesTVShowsUrl(),
        icon: '/svg/tv.svg'
    },
    {
        key: TitleKeys.PERSONS,
        href: pagesPersonsUrl(),
        icon: '/svg/users.svg'
    }
];