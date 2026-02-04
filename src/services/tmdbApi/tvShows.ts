import { cache } from 'react';

import { MediaType, TVShowType } from '@/enums';
import {
    CurrentTVShowShema,
    DataShema,
    ReviewShema,
    SimilarTVShowShema,
    TVShowDetailsShema,
    TVShowSeasonDetailsShema,
    TVShowShema
} from '@/shemas';

import { fetchApi } from './api';

export const getTVShows = (type: TVShowType, page: number) => {
    return fetchApi<DataShema<TVShowShema>>(
        `${ MediaType.TV_SHOW }/${ type }?page=${ page }`
    );
};

export const getTVShowById = cache((id: string) => {
    return fetchApi<TVShowDetailsShema>(
        `${ MediaType.TV_SHOW }/${ id }?append_to_response=credits,videos,reviews,recommendations,external_ids`
    );
});

export const getCurrentTVShowById = cache((id: string) => {
    return fetchApi<CurrentTVShowShema>(`${ MediaType.TV_SHOW }/${ id }`);
});

export const getSimilarTVShows = (id: string, page: number) => {
    return fetchApi<DataShema<SimilarTVShowShema>>(
        `${ MediaType.TV_SHOW }/${ id }/similar?page=${ page }`
    );
};

export const getRecommendationsTVShows = (id: string, page: number) => {
    return fetchApi<DataShema<TVShowShema>>(
        `${ MediaType.TV_SHOW }/${ id }/recommendations?page=${ page }`
    );
};

export const getReviewsToTVShow = (id: string, page: number) => {
    return fetchApi<DataShema<ReviewShema>>(
        `${ MediaType.TV_SHOW }/${ id }/reviews?page=${ page }`
    );
};

export const getTVShowSeasonByNumber = (seriesId: string, number: number) => {
    return fetchApi<TVShowSeasonDetailsShema>(
        `${ MediaType.TV_SHOW }/${ seriesId }/season/${ number }`
    );
};
