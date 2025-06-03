import { MovieType, MediaType, TimeType, TVShowType } from '@/enums';
import { PARAMETERS } from '@/helpers/parameters';
import {
    // CreditsShema,
    DataShema,
    MovieDetailsShema,
    MovieDetailsForSimilarShema,
    MovieShema,
    TVShowDetailsShema,
    TVShowSeasonDetailsShema,
    TVShowShema,
    TVShowDetailsForSimilarShema
} from '@/shemas';

async function fetchApi<T>(url: string) {
    const buildUrl = new URL(`${PARAMETERS.BASE_URL}/${url}`);
    buildUrl.searchParams.append('api_key', PARAMETERS.API_KEY || '');
    buildUrl.searchParams.append('language', PARAMETERS.LOCALE || '');

    const response = await fetch(buildUrl, {
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return (await response.json()) as T;
}

export function getTrendings(type: 'all' | MediaType, time: TimeType, page: number) {
    return fetchApi<DataShema<MovieShema> | DataShema<TVShowShema>>(
        `trending/${type}/${time}?page=${page}`
    );
}

export function getMovies(type: MovieType, page: number) {
    return fetchApi<DataShema<MovieShema>>(`${MediaType.MOVIE}/${type}?page=${page}`);
}

export function getMovieById(id: string) {
    return fetchApi<MovieDetailsShema>(
        `${MediaType.MOVIE}/${id}?append_to_response=credits,videos,reviews,recommendations`
    );
}

export function getSimilarToMovie(id: string, page: number) {
    return fetchApi<MovieDetailsForSimilarShema>(
        `${MediaType.MOVIE}/${id}?append_to_response=similar&page=${page}`
    );
}

export function getTVShows(type: TVShowType, page: number) {
    return fetchApi<DataShema<TVShowShema>>(`${MediaType.TV_SHOW}/${type}?page=${page}`);
}

export function getTVShowById(id: string) {
    return fetchApi<TVShowDetailsShema>(
        `${MediaType.TV_SHOW}/${id}?append_to_response=credits,videos,reviews,recommendations`
    );
}

export function getSimilarToTVShow(id: string, page: number) {
    return fetchApi<TVShowDetailsForSimilarShema>(
        `${MediaType.TV_SHOW}/${id}?append_to_response=similar&page=${page}`
    );
}

// ------------------------------------------------------------------------------------

export function getTVShowSeasonByNumber(seriesId: string, number: number) {
    return fetchApi<TVShowSeasonDetailsShema>(`${MediaType.TV_SHOW}/${seriesId}/season/${number}`);
}

export function getSearch(type: MediaType, query: string, page: number) {
    return fetchApi(`search/${type}?query=${query}&page=${page}&include_adult=${PARAMETERS.ADULT}`);
}

// export function getCredits(type: MediaType, id: string) {
//     return fetchApi<CreditsShema>(`${type}/${id}/credits`);
// }

// export function getVideos(type: MediaType, id: string) {
//     return fetchApi(`${type}/${id}/videos`);
// }

export function getReviews(type: MediaType, id: string, page: number) {
    return fetchApi(`${type}/${id}/reviews?page=${page}`);
}

export function getRecommendations(type: MediaType, id: string, page: number) {
    return fetchApi(`${type}/${id}/recommendations?page=${page}`);
}