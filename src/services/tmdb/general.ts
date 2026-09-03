import { Locale } from 'next-intl';

import { MediaType, TimeType } from '@/enums';
import {
    CompanyDetailsShema,
    DataShema,
    MovieShema,
    NetworkDetailsShema,
    PersonShema,
    ReviewShema,
    TVShowShema
} from '@/shemas';
import { Adult } from '@/types';

import { fetchApi } from './api';

export const getTrendings = async (
    type: 'all' | MediaType, time: TimeType,
    page: number,
    locale: Locale
) => {
    return fetchApi<DataShema<MovieShema | TVShowShema | PersonShema>>(
        `trending/${ type }/${ time }?page=${ page }`,
        locale
    );
};

export const getSearch = async (
    type: 'multi' | MediaType,
    adult: Adult,
    query: string,
    page: number,
    locale: Locale
) => {
    const params = new URLSearchParams({
        query,
        page: String(page),
        include_adult: adult
    });

    return fetchApi<DataShema<MovieShema | TVShowShema | PersonShema>>(
        `search/${ type }?${ params.toString() }`,
        locale
    );
};

export const getRecommendations = async <T>(
    type: MediaType.MOVIE | MediaType.TV_SHOW,
    id: string,
    page: number,
    locale: Locale
) => {
    return fetchApi<DataShema<T>>(
        `${ type }/${ id }/recommendations?page=${ page }`,
        locale
    );
};

export const getReviews = async (
    type: MediaType.MOVIE | MediaType.TV_SHOW,
    id: string,
    page: number,
    locale: Locale
) => {
    return fetchApi<DataShema<ReviewShema>>(
        `${ type }/${ id }/reviews?page=${ page }`,
        locale
    );
};

export const getNetworkById = async (id: string, locale: Locale) => {
    return fetchApi<NetworkDetailsShema>(`network/${ id }`, locale);
};

export const getCompanyById = async (id: string, locale: Locale) => {
    return fetchApi<CompanyDetailsShema>(`company/${ id }`, locale);
};