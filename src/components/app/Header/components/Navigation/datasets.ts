import { NavTitleType } from '@/enums';
import { pagesMoviesUrl, pagesPersonsUrl, pagesSearchUrl, pagesTVShowsUrl } from '@/routes';

export const LINKS = [
    {
        key: NavTitleType.SEARCH,
        href: pagesSearchUrl(),
        icon: '/svg/search.svg'
    },
    {
        key: NavTitleType.MOVIES,
        href: pagesMoviesUrl(),
        icon: '/svg/movie.svg'
    },
    {
        key: NavTitleType.TV_SHOWS,
        href: pagesTVShowsUrl(),
        icon: '/svg/tv.svg'
    },
    {
        key: NavTitleType.PERSONS,
        href: pagesPersonsUrl(),
        icon: '/svg/users.svg'
    }
];