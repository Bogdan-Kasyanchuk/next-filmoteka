import { MediaType, TimeType } from '@/enums';
import {
    DataShema,
    MovieShema,
    NetworkDetailsShema,
    PersonShema,
    ProductionCompanyDetailsShema,
    ReviewShema,
    TVShowShema,
    VideosShema
} from '@/shemas';
import { Adult } from '@/types';

import { fetchApi } from './api';

export const getTrendings = (type: 'all' | MediaType, time: TimeType, page: number) => {
    return fetchApi<DataShema<MovieShema | TVShowShema | PersonShema>>(
        `trending/${ type }/${ time }?page=${ page }`
    );
};

export const getSearch = (
    type: 'multi' | MediaType,
    adult: Adult,
    query: string,
    page: number
) => {
    return fetchApi<DataShema<MovieShema | TVShowShema | PersonShema>>(
        `search/${ type }?query=${ query }&page=${ page }&include_adult=${ adult }`
    );
};

export const getRecommendations = <T>(
    type: MediaType.MOVIE | MediaType.TV_SHOW,
    id: string,
    page: number
) => {
    return fetchApi<DataShema<T>>(
        `${ type }/${ id }/recommendations?page=${ page }`
    );
};

export const getReviews = (
    type: MediaType.MOVIE | MediaType.TV_SHOW,
    id: string,
    page: number
) => {
    return fetchApi<DataShema<ReviewShema>>(
        `${ type }/${ id }/reviews?page=${ page }`
    );
};

export const getVideos = async (
    type: MediaType.MOVIE | MediaType.TV_SHOW,
    id: string
) => {
    return fetchApi<VideosShema>(`${ type }/${ id }/videos`);
};

export const getNetworkById = (id: string) => {
    return fetchApi<NetworkDetailsShema>(`network/${ id }`);
};

export const getProductionCompanyById = (id: string) => {
    return fetchApi<ProductionCompanyDetailsShema>(`company/${ id }` );
};