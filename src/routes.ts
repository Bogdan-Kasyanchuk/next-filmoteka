import { MediaType } from '@/enums';

export const pagesHomeUrl = () => '/';

export const pagesSearchUrl = () => '/search';

export const pagesMoviesUrl = () => '/movies';

export const pagesMovieUrl = (id: string) => `/movies/${id}`;

export const pagesTVShowsUrl = () => '/tv-shows';

export const pagesTVShowUrl = (id: string) => `/tv-shows/${id}`;

export const pagesSeasonUrl = (tvShowId: string, season: string) => `/tv-shows/${tvShowId}/season-${season}`;

export const pagesPersonsUrl = () => '/persons';

export const pagesPersonUrl = (id: string) => `/persons/${id}`;

export const pagesSimilarUrl = (type: MediaType, id: string) => `/${type === MediaType.MOVIE ? 'movies' : 'tv-shows'}/${id}/similar`;

export const recommendationsUrl = (type: MediaType, id: string) => `/${type === MediaType.MOVIE ? 'movies' : 'tv-shows'}/${id}/recommendations`;

export const reviewsUrl = (type: MediaType, id: string) => `/${type === MediaType.MOVIE ? 'movies' : 'tv-shows'}/${id}/reviews`;

export const youtubeEmbedUrl = (id: string) => `https://www.youtube.com/embed/${id}`;

export const imageUrl = (size: string, path: string) => `https://image.tmdb.org/t/p/${size}${path}`;