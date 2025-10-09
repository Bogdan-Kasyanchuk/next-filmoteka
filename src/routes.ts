import { MediaType } from '@/enums';

import { PARAMETERS } from './helpers/parameters';

export const pagesHomeUrl = () => '/';

export const pagesSearchUrl = () => '/search';

export const pagesMoviesUrl = () => '/movies';

export const pagesMovieUrl = (id: string) => `/movies/${ id }`;

export const pagesTVShowsUrl = () => '/tv-shows';

export const pagesTVShowUrl = (id: string) => `/tv-shows/${ id }`;

export const pagesSeasonUrl = (tvShowId: string, season: string) => `/tv-shows/${ tvShowId }/season-${ season }`;

export const pagesPersonsUrl = () => '/persons';

export const pagesPersonUrl = (id: string) => `/persons/${ id }`;

export const pagesSimilarUrl = (type: MediaType, id: string) => `/${ type === MediaType.MOVIE ? 'movies' : 'tv-shows' }/${ id }/similar`;

export const recommendationsUrl = (type: MediaType, id: string) => `/${ type === MediaType.MOVIE ? 'movies' : 'tv-shows' }/${ id }/recommendations`;

export const reviewsUrl = (type: MediaType, id: string) => `/${ type === MediaType.MOVIE ? 'movies' : 'tv-shows' }/${ id }/reviews`;

export const youtubeEmbedUrl = (id: string) => `${ PARAMETERS.YOUTUBE_EMBED_URL }/${ id }`;

export const imageUrl = (size: string, path: string) => `${ PARAMETERS.IMAGE_URL }/${ size }${ path }`;