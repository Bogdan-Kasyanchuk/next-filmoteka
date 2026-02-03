// import { MediaType, MovieType } from '@/enums';
// import {
//     CurrentMovieShema,
//     DataShema,
//     MovieDetailsShema,
//     MovieShema,
//     ReviewShema,
//     SimilarMovieShema
// } from '@/shemas';

// export function getMovies(type: MovieType, page: number) {
//     return fetchApi<DataShema<MovieShema>>(`${ MediaType.MOVIE }/${ type }?page=${ page }`);
// }

// export function getMovieById(id: string) {
//     return fetchApi<MovieDetailsShema>(
//         `${ MediaType.MOVIE }/${ id }?append_to_response=credits,videos,reviews,recommendations,external_ids`
//     );
// }

// export function getCurrentMovieById(id: string) {
//     return fetchApi<CurrentMovieShema>(`${ MediaType.MOVIE }/${ id }`);
// }

// export function getSimilarMovies(id: string, page: number) {
//     return fetchApi<DataShema<SimilarMovieShema>>(
//         `${ MediaType.MOVIE }/${ id }/similar?page=${ page }`
//     );
// }

// export function getRecommendationsMovies(id: string, page: number) {
//     return fetchApi<DataShema<MovieShema>>(
//         `${ MediaType.MOVIE }/${ id }/recommendations?page=${ page }`
//     );
// }

// export function getReviewsToMovie(id: string, page: number) {
//     return fetchApi<DataShema<ReviewShema>>(
//         `${ MediaType.MOVIE }/${ id }/reviews?page=${ page }`
//     );
// }

