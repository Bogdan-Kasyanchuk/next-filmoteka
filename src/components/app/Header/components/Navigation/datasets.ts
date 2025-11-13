import {
    pagesHomeUrl,
    pagesMoviesUrl,
    pagesPersonsUrl,
    pagesSearchUrl,
    pagesTVShowsUrl
} from '@/routes';

export const links = [
    {
        name: 'Search',
        href: pagesSearchUrl(),
        icon: '/svg/search.svg',
        exact: false
    },
    {
        name: 'Home',
        href: pagesHomeUrl(),
        icon: '/svg/home.svg',
        exact: true
    },
    {
        name: 'Movies',
        href: pagesMoviesUrl(),
        icon: '/svg/movie.svg',
        exact: false
    },
    {
        name: 'TV Shows',
        href: pagesTVShowsUrl(),
        icon: '/svg/tv.svg',
        exact: false
    },
    {
        name: 'Persons',
        href: pagesPersonsUrl(),
        icon: '/svg/users.svg',
        exact: false
    }
];