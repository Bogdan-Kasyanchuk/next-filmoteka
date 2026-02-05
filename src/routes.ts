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

// ---URLS----
export const youtubeEmbedUrl = (id: string) => `${ URLS.YOUTUBE_EMBED }/${ id }`;

export const imageUrl = (size: string, path: string) => `${ URLS.IMAGE }/${ size }${ path }`;

export const imdbUrl = (id: string, type: 'title' | 'name') => `${ URLS.IMDB }/${ type }/${ id }`;

export const wikidataUrl = (id: string) => `${ URLS.WIKIDATA }/${ id }`;

export const facebookUrl = (id: string) => `${ URLS.FACEBOOK }/${ id }`;

export const instagramUrl = (id: string) => `${ URLS.INSTAGRAM }/${ id }`;

export const twitterUrl = (id: string) => `${ URLS.TWITTER }/${ id }`;

export const tiktokUrl = (id: string) => `${ URLS.TIKTOK }/@${ id }`;

export const youtubeUrl = (id: string) => `${ URLS.YOUTUBE }/${ id }`;