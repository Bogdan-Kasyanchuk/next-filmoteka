import { MovieType, MediaType, TimeType, TVShowType } from '@/enums';
import { PARAMETERS } from '@/helpers/parameters';
import {
    DataShema,
    MovieDetailsShema,
    MovieShema,
    TVShowDetailsShema,
    TVShowSeasonDetailsShema,
    TVShowShema,
    TVShowDetailsForSimilarShema,
    PersonShema,
    PersonDetailsShema,
    TVShowDetailsForReviewsShema,
    TVShowDetailsForRecommendationsShema,
    CurrentMovieDetailsShema,
    SimilarMovieShema,
    RecommendationMovieShema,
    ReviewShema
} from '@/shemas';

async function fetchApi<T>(url: string) {
    const buildUrl = new URL(`${PARAMETERS.BASE_URL}/${url}`);
    if (PARAMETERS.API_KEY) {
        buildUrl.searchParams.append('api_key', PARAMETERS.API_KEY);
    }

    if (PARAMETERS.LOCALE) {
        buildUrl.searchParams.append('language', PARAMETERS.LOCALE);
    }

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

export function getCurrentMovieById(id: string) {
    return fetchApi<CurrentMovieDetailsShema>(`${MediaType.MOVIE}/${id}`);
}

export function getSimilarMovies(id: string, page: number) {
    return fetchApi<DataShema<SimilarMovieShema>>(
        `${MediaType.MOVIE}/${id}/similar?page=${page}`
    );
}

export function getRecommendationsMovies(id: string, page: number) {
    return fetchApi<DataShema<RecommendationMovieShema>>(
        `${MediaType.MOVIE}/${id}/recommendations?page=${page}`
    );
}

export function getReviewsToMovie(id: string, page: number) {
    return fetchApi<DataShema<ReviewShema>>(
        `${MediaType.MOVIE}/${id}/reviews?page=${page}`
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

export function getRecommendationsToTVShow(id: string, page: number) {
    return fetchApi<TVShowDetailsForRecommendationsShema>(
        `${MediaType.TV_SHOW}/${id}?append_to_response=recommendations&page=${page}`
    );
}

export function getReviewsToTVShow(id: string, page: number) {
    return fetchApi<TVShowDetailsForReviewsShema>(
        `${MediaType.TV_SHOW}/${id}?append_to_response=reviews&page=${page}`
    );
}

export function getTVShowSeasonByNumber(seriesId: string, number: string) {
    return fetchApi<TVShowSeasonDetailsShema>(`${MediaType.TV_SHOW}/${seriesId}/season/${number}`);
}

export function getPersons(page: number) {
    return fetchApi<DataShema<PersonShema>>(`person/popular?page=${page}`);
}

export function getPersonById(id: string) {
    return fetchApi<PersonDetailsShema>(
        `person/${id}?append_to_response=combined_credits`
    );
}

export function getSearch(query: string, page: number) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return fetchApi<DataShema<any>>(`search/multi?query=${query}&page=${page}&include_adult=${PARAMETERS.ADULT}`);
}