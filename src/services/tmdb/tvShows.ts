import { cache } from 'react';

import { MediaType, TVShowType } from '@/enums';
import {
    CurrentTVShowShema,
    DataShema,
    SimilarTVShowShema,
    TVShowDetailsShema,
    TVShowSeasonDetailsShema,
    TVShowShema
} from '@/shemas';
import { Locale } from '@/types';

import { fetchApi } from './api';

export const getTVShows = (type: TVShowType, page: number, locale: Locale) => {
    return fetchApi<DataShema<TVShowShema>>(
        `${ MediaType.TV_SHOW }/${ type }?page=${ page }`,
        locale
    );
};

export const getTVShowById = cache((id: string, locale: Locale) => {
    return fetchApi<TVShowDetailsShema>(
        `${ MediaType.TV_SHOW }/${ id }?append_to_response=credits,external_ids`,
        locale
    );
});

export const getCurrentTVShowById = cache((id: string, locale: Locale) => {
    return fetchApi<CurrentTVShowShema>(`${ MediaType.TV_SHOW }/${ id }`, locale);
});

export const getSimilarTVShows = (id: string, page: number, locale: Locale) => {
    return fetchApi<DataShema<SimilarTVShowShema>>(
        `${ MediaType.TV_SHOW }/${ id }/similar?page=${ page }`,
        locale
    );
};

export const getTVShowSeasonByNumber = (seriesId: string, number: number, locale: Locale) => {
    return fetchApi<TVShowSeasonDetailsShema>(
        `${ MediaType.TV_SHOW }/${ seriesId }/season/${ number }`,
        locale
    );
};
