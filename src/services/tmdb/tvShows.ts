import { Locale } from 'next-intl';
import { cache } from 'react';

import { MediaType, TVShowType } from '@/enums';
import {
    CurrentTVShowShema,
    DataShema,
    SeasonDetailsShema,
    SimilarTVShowShema,
    TVShowDetailsShema,
    TVShowShema
} from '@/shemas';

import { fetchApi, getVideoLanguages } from './api';

export const getTVShows = async (type: TVShowType, page: number, locale: Locale) => {
    return fetchApi<DataShema<TVShowShema>>(
        `${ MediaType.TV_SHOW }/${ type }`,
        locale,
        { params: { page } }
    );
};

export const getTVShowById = cache(async (id: string, locale: Locale) => {
    return fetchApi<TVShowDetailsShema>(
        `${ MediaType.TV_SHOW }/${ id }`,
        locale,
        {
            params: {
                append_to_response: 'credits,external_ids,videos,similar',
                include_video_language: getVideoLanguages(locale)
            }
        }
    );
});

export const getCurrentTVShowById = cache(async (id: string, locale: Locale) => {
    return fetchApi<CurrentTVShowShema>(`${ MediaType.TV_SHOW }/${ id }`, locale);
});

export const getSimilarTVShows = async (id: string, page: number, locale: Locale) => {
    return fetchApi<DataShema<SimilarTVShowShema>>(
        `${ MediaType.TV_SHOW }/${ id }/similar`,
        locale,
        { params: { page } }
    );
};

export const getTVShowSeasonByNumber = async (seriesId: string, number: number, locale: Locale) => {
    return fetchApi<SeasonDetailsShema>(
        `${ MediaType.TV_SHOW }/${ seriesId }/season/${ number }`,
        locale
    );
};
