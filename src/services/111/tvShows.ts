// import { MediaType, TVShowType } from '@/enums';
// import {
//     CurrentTVShowShema,
//     DataShema,
//     ReviewShema,
//     SimilarTVShowShema,
//     TVShowDetailsShema,
//     TVShowSeasonDetailsShema,
//     TVShowShema
// } from '@/shemas';

// export function getTVShows(type: TVShowType, page: number) {
//     return fetchApi<DataShema<TVShowShema>>(
//         `${ MediaType.TV_SHOW }/${ type }?page=${ page }`
//     );
// }

// export function getTVShowById(id: string) {
//     return fetchApi<TVShowDetailsShema>(
//         `${ MediaType.TV_SHOW }/${ id }?append_to_response=credits,videos,reviews,recommendations,external_ids`
//     );
// }

// export function getCurrentTVShowById(id: string) {
//     return fetchApi<CurrentTVShowShema>(`${ MediaType.TV_SHOW }/${ id }`);
// }

// export function getSimilarTVShows(id: string, page: number) {
//     return fetchApi<DataShema<SimilarTVShowShema>>(
//         `${ MediaType.TV_SHOW }/${ id }/similar?page=${ page }`
//     );
// }

// export function getRecommendationsTVShows(id: string, page: number) {
//     return fetchApi<DataShema<TVShowShema>>(
//         `${ MediaType.TV_SHOW }/${ id }/recommendations?page=${ page }`
//     );
// }

// export function getReviewsToTVShow(id: string, page: number) {
//     return fetchApi<DataShema<ReviewShema>>(
//         `${ MediaType.TV_SHOW }/${ id }/reviews?page=${ page }`
//     );
// }

// export function getTVShowSeasonByNumber(seriesId: string, number: number) {
//     return fetchApi<TVShowSeasonDetailsShema>(
//         `${ MediaType.TV_SHOW }/${ seriesId }/season/${ number }`
//     );
// }
