import { URLS } from '@/datasets/constants';

export const youtubeEmbedUrl = (id: string) => `${ URLS.YOUTUBE_EMBED }/${ id }`;

export const imageUrl = (size: string, path: string) => `${ URLS.IMAGE }/${ size }${ path }`;

export const imdbUrl = (id: string, type: 'title' | 'name') => `${ URLS.IMDB }/${ type }/${ id }`;

export const wikidataUrl = (id: string) => `${ URLS.WIKIDATA }/${ id }`;

export const facebookUrl = (id: string) => `${ URLS.FACEBOOK }/${ id }`;

export const instagramUrl = (id: string) => `${ URLS.INSTAGRAM }/${ id }`;

export const twitterUrl = (id: string) => `${ URLS.TWITTER }/${ id }`;

export const tiktokUrl = (id: string) => `${ URLS.TIKTOK }/@${ id }`;

export const youtubeUrl = (id: string) => `${ URLS.YOUTUBE }/${ id }`;