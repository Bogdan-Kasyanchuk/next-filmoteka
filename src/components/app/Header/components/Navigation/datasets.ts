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
        code: 'search',
        exact: false
    },
    {
        name: 'Home',
        href: pagesHomeUrl(),
        icon: '/svg/home.svg',
        code: 'home',
        exact: true
    },
    {
        name: 'Movies',
        href: pagesMoviesUrl(),
        icon: '/svg/movie.svg',
        code: 'movies',
        exact: false
    },
    {
        name: 'TV Shows',
        href: pagesTVShowsUrl(),
        icon: '/svg/tv.svg',
        code: 'tv',
        exact: false
    },
    {
        name: 'Persons',
        href: pagesPersonsUrl(),
        icon: '/svg/persons.svg',
        code: 'persons',
        exact: false
    }
];