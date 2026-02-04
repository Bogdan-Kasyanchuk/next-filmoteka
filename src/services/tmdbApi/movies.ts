import { cache } from 'react';

import { MediaType, MovieType } from '@/enums';
import {
    CurrentMovieShema,
    DataShema,
    MovieDetailsShema,
    MovieShema,
    ReviewShema,
    SimilarMovieShema,
    VideosShema
} from '@/shemas';

import { fetchApi } from './api';

export const getMovies = (type: MovieType, page: number) => {
    return fetchApi<DataShema<MovieShema>>(`${ MediaType.MOVIE }/${ type }?page=${ page }`);
};

export const getMovieById = cache((id: string) => {
    return fetchApi<MovieDetailsShema>(
        `${ MediaType.MOVIE }/${ id }?append_to_response=credits,external_ids`
    );
});

export const getCurrentMovieById = cache(
    (id: string) => {
        return fetchApi<CurrentMovieShema>(`${ MediaType.MOVIE }/${ id }`);
    });

export const getSimilarMovies = (id: string, page: number) => {
    return fetchApi<DataShema<SimilarMovieShema>>(
        `${ MediaType.MOVIE }/${ id }/similar?page=${ page }`
    );
};

export const getRecommendationsMovies = (id: string, page: number) => {
    return fetchApi<DataShema<MovieShema>>(
        `${ MediaType.MOVIE }/${ id }/recommendations?page=${ page }`
    );
};

export const getReviewsToMovie = (id: string, page: number) => {
    return fetchApi<DataShema<ReviewShema>>(
        `${ MediaType.MOVIE }/${ id }/reviews?page=${ page }`
    );
};

export const getMoviesVideos = async (id: string) => {
    return fetchApi<VideosShema>(
        `${ MediaType.MOVIE }/${ id }/videos`
    );
};