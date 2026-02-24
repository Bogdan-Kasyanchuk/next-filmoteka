import { URLS } from '@/datasets/constants';
import { MediaType } from '@/enums';

// ---PAGES----
export const pagesHomeUrl = () => '/';

export const pagesSearchUrl = () => '/search';

export const pagesTrendingDayUrl = () => '/trending/day';

export const pagesTrendingWeekUrl = () => '/trending/week';

export const pagesMoviesUrl = () => '/movies';

export const pagesMovieUrl = (id: string) => `/movies/${ id }`;

export const pagesTVShowsUrl = () => '/tv-shows';

export const pagesTVShowUrl = (id: string) => `/tv-shows/${ id }`;

export const pagesSeasonUrl = (tvShowId: string, season: number) => `/tv-shows/${ tvShowId }/seasons/${ season }`;

export const pagesPersonsUrl = () => '/persons';

export const pagesPersonUrl = (id: string) => `/persons/${ id }`;

export const pagesSimilarUrl = (type: MediaType, id: string) => `/${ type === MediaType.MOVIE ? 'movies' : 'tv-shows' }/${ id }/similar`;
