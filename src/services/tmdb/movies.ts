import { Locale } from 'next-intl';
import { cache } from 'react';

import { MediaType, MovieType } from '@/enums';
import {
    CurrentMovieShema,
    DataShema,
    MovieDetailsShema,
    MovieShema,
    SimilarMovieShema
} from '@/shemas';

import { fetchApi, getVideoLanguages } from './api';

export const getMovies = async (type: MovieType, page: number, locale: Locale) => {
    return fetchApi<DataShema<MovieShema>>(
        `${ MediaType.MOVIE }/${ type }`,
        locale,
        { params: { page } }
    );
};

export const getMovieById = cache(async (id: string, locale: Locale) => {
    return fetchApi<MovieDetailsShema>(
        `${ MediaType.MOVIE }/${ id }`,
        locale,
        {
            params: {
                append_to_response: 'credits,external_ids,videos,similar',
                include_video_language: getVideoLanguages(locale)
            }
        }
    );
});

export const getCurrentMovieById = cache(async (id: string, locale: Locale) => {
    return fetchApi<CurrentMovieShema>(`${ MediaType.MOVIE }/${ id }`, locale);
});

export const getSimilarMovies = async (id: string, page: number, locale: Locale) => {
    return fetchApi<DataShema<SimilarMovieShema>>(
        `${ MediaType.MOVIE }/${ id }/similar`,
        locale,
        { params: { page } }
    );
};