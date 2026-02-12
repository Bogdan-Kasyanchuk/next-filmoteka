import { cache } from 'react';

import { MediaType, MovieType } from '@/enums';
import {
    CurrentMovieShema,
    DataShema,
    MovieDetailsShema,
    MovieShema,
    SimilarMovieShema
} from '@/shemas';
import { Locale } from '@/types';

import { fetchApi } from './api';

export const getMovies = (type: MovieType, page: number, locale: Locale) => {
    return fetchApi<DataShema<MovieShema>>(
        `${ MediaType.MOVIE }/${ type }?page=${ page }`,
        locale
    );
};

export const getMovieById = cache((id: string, locale: Locale) => {
    return fetchApi<MovieDetailsShema>(
        `${ MediaType.MOVIE }/${ id }?append_to_response=credits,external_ids`,
        locale
    );
});

export const getCurrentMovieById = cache((id: string, locale: Locale) => {
    return fetchApi<CurrentMovieShema>(`${ MediaType.MOVIE }/${ id }`, locale);
});

export const getSimilarMovies = (id: string, page: number, locale: Locale) => {
    return fetchApi<DataShema<SimilarMovieShema>>(
        `${ MediaType.MOVIE }/${ id }/similar?page=${ page }`,
        locale
    );
};