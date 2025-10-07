import { MediaType, MovieType, TVShowType, TimeType } from '@/enums';
import { PARAMETERS } from '@/helpers/parameters';
import {
    CurrentMovieShema,
    CurrentTVShowShema,
    DataShema,
    MovieDetailsShema,
    MovieShema,
    NetworkDetailsShema,
    PersonDetailsShema,
    PersonShema,
    ProductionCompanyDetailsShema,
    ReviewShema,
    SimilarMovieShema,
    SimilarTVShowShema,
    TVShowDetailsShema,
    TVShowSeasonDetailsShema,
    TVShowShema
} from '@/shemas';
import { Adult } from '@/types';

async function fetchApi<T>(url: string) {
    const buildUrl = new URL(`${ PARAMETERS.BASE_URL }/${ url }`);

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
    return fetchApi<DataShema<MovieShema | TVShowShema | PersonShema>>(
        `trending/${ type }/${ time }?page=${ page }`
    );
}

export function getMovies(type: MovieType, page: number) {
    return fetchApi<DataShema<MovieShema>>(`${ MediaType.MOVIE }/${ type }?page=${ page }`);
}

export function getMovieById(id: string) {
    return fetchApi<MovieDetailsShema>(
        `${ MediaType.MOVIE }/${ id }?append_to_response=credits,videos,reviews,recommendations,external_ids`
    );
}

export function getCurrentMovieById(id: string) {
    return fetchApi<CurrentMovieShema>(`${ MediaType.MOVIE }/${ id }`);
}

export function getSimilarMovies(id: string, page: number) {
    return fetchApi<DataShema<SimilarMovieShema>>(
        `${ MediaType.MOVIE }/${ id }/similar?page=${ page }`
    );
}

export function getRecommendationsMovies(id: string, page: number) {
    return fetchApi<DataShema<MovieShema>>(
        `${ MediaType.MOVIE }/${ id }/recommendations?page=${ page }`
    );
}

export function getReviewsToMovie(id: string, page: number) {
    return fetchApi<DataShema<ReviewShema>>(
        `${ MediaType.MOVIE }/${ id }/reviews?page=${ page }`
    );
}

export function getTVShows(type: TVShowType, page: number) {
    return fetchApi<DataShema<TVShowShema>>(`${ MediaType.TV_SHOW }/${ type }?page=${ page }`);
}

export function getTVShowById(id: string) {
    return fetchApi<TVShowDetailsShema>(
        `${ MediaType.TV_SHOW }/${ id }?append_to_response=credits,videos,reviews,recommendations,external_ids`
    );
}

export function getCurrentTVShowById(id: string) {
    return fetchApi<CurrentTVShowShema>(`${ MediaType.TV_SHOW }/${ id }`);
}

export function getSimilarTVShow(id: string, page: number) {
    return fetchApi<DataShema<SimilarTVShowShema>>(
        `${ MediaType.TV_SHOW }/${ id }/similar?page=${ page }`
    );
}

export function getRecommendationsTVShow(id: string, page: number) {
    return fetchApi<DataShema<TVShowShema>>(
        `${ MediaType.TV_SHOW }/${ id }/recommendations?page=${ page }`
    );
}

export function getReviewsToTVShow(id: string, page: number) {
    return fetchApi<DataShema<ReviewShema>>(
        `${ MediaType.TV_SHOW }/${ id }/reviews?page=${ page }`
    );
}

export function getTVShowSeasonByNumber(seriesId: string, number: string) {
    return fetchApi<TVShowSeasonDetailsShema>(`${ MediaType.TV_SHOW }/${ seriesId }/season/${ number }`);
}

export function getPersons(page: number) {
    return fetchApi<DataShema<PersonShema>>(`person/popular?page=${ page }`);
}

export function getPersonById(id: string) {
    return fetchApi<PersonDetailsShema>(
        `person/${ id }?append_to_response=combined_credits,images,external_ids`
    );
}

export function getSearch(
    type: 'multi' | MediaType,
    adult: Adult,
    query: string,
    page: number
) {
    return fetchApi<DataShema<MovieShema | TVShowShema | PersonShema>>(
        `search/${ type }?query=${ query }&page=${ page }&include_adult=${ adult }`
    );
}

export function getNetworkById(id: number) {
    return fetchApi<NetworkDetailsShema>(`network/${ id }`);
}

export function getProductionCompanyById(id: number) {
    return fetchApi<ProductionCompanyDetailsShema>(`company/${ id }`);
}