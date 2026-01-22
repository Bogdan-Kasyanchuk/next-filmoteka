import { notFound } from 'next/navigation';

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

type FetchOptions = {
    next?: {
        revalidate?: number
    }
};

export async function fetchApi<T>(
    path: string,
    options: FetchOptions = {}
): Promise<T> {
    const isServer = typeof window === 'undefined';

    const baseUrl = isServer
        ? PARAMETERS.API_URL
        : '/api/tmdb';

    const url = new URL(`${ baseUrl }/${ path }`, isServer ? undefined : window.location.origin);

    if (isServer) {
        url.searchParams.set('api_key', PARAMETERS.API_KEY);
        url.searchParams.set('language', PARAMETERS.LOCALE);
    }

    const fetchOptions: RequestInit & {
        next?: FetchOptions['next']
    } = {};

    if (isServer && options.next) {
        fetchOptions.next = options.next;
    }

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {

        if (response.status === 404) {
            return notFound();
        }

        const text = await response.text();
        throw new Error(text || 'API error');
    }

    return response.json() as Promise<T>;
}

export function getTrendings(type: 'all' | MediaType, time: TimeType, page: number) {
    return fetchApi<DataShema<MovieShema | TVShowShema | PersonShema>>(
        `trending/${ type }/${ time }?page=${ page }`,
        {
            next: {
                revalidate: 60
            }
        }
    );
}

export function getMovies(type: MovieType, page: number) {
    return fetchApi<DataShema<MovieShema>>(`${ MediaType.MOVIE }/${ type }?page=${ page }`,
        {
            next: {
                revalidate: 60
            }
        }
    );
}

export function getMovieById(id: string) {
    return fetchApi<MovieDetailsShema>(
        `${ MediaType.MOVIE }/${ id }?append_to_response=credits,videos,reviews,recommendations,external_ids`,
        {
            next: {
                revalidate: 60
            }
        }
    );
}

export function getCurrentMovieById(id: string) {
    return fetchApi<CurrentMovieShema>(`${ MediaType.MOVIE }/${ id }`,
        {
            next: {
                revalidate: 60
            }
        }
    );
}

export function getSimilarMovies(id: string, page: number) {
    return fetchApi<DataShema<SimilarMovieShema>>(
        `${ MediaType.MOVIE }/${ id }/similar?page=${ page }`,
        {
            next: {
                revalidate: 60
            }
        }
    );
}

export function getRecommendationsMovies(id: string, page: number) {
    return fetchApi<DataShema<MovieShema>>(
        `${ MediaType.MOVIE }/${ id }/recommendations?page=${ page }`,
        {
            next: {
                revalidate: 60
            }
        }
    );
}

export function getReviewsToMovie(id: string, page: number) {
    return fetchApi<DataShema<ReviewShema>>(
        `${ MediaType.MOVIE }/${ id }/reviews?page=${ page }`,
        {
            next: {
                revalidate: 60
            }
        }
    );
}

export function getTVShows(type: TVShowType, page: number) {
    return fetchApi<DataShema<TVShowShema>>(`${ MediaType.TV_SHOW }/${ type }?page=${ page }`,
        {
            next: {
                revalidate: 60
            }
        }
    );
}

export function getTVShowById(id: string) {
    return fetchApi<TVShowDetailsShema>(
        `${ MediaType.TV_SHOW }/${ id }?append_to_response=credits,videos,reviews,recommendations,external_ids`,
        {
            next: {
                revalidate: 60
            }
        }
    );
}

export function getCurrentTVShowById(id: string) {
    return fetchApi<CurrentTVShowShema>(`${ MediaType.TV_SHOW }/${ id }`,
        {
            next: {
                revalidate: 60
            }
        }
    );
}

export function getSimilarTVShow(id: string, page: number) {
    return fetchApi<DataShema<SimilarTVShowShema>>(
        `${ MediaType.TV_SHOW }/${ id }/similar?page=${ page }`,
        {
            next: {
                revalidate: 60
            }
        }
    );
}

export function getRecommendationsTVShow(id: string, page: number) {
    return fetchApi<DataShema<TVShowShema>>(
        `${ MediaType.TV_SHOW }/${ id }/recommendations?page=${ page }`,
        {
            next: {
                revalidate: 60
            }
        }
    );
}

export function getReviewsToTVShow(id: string, page: number) {
    return fetchApi<DataShema<ReviewShema>>(
        `${ MediaType.TV_SHOW }/${ id }/reviews?page=${ page }`,
        {
            next: {
                revalidate: 60
            }
        }
    );
}

export function getTVShowSeasonByNumber(seriesId: string, number: number) {
    return fetchApi<TVShowSeasonDetailsShema>(`${ MediaType.TV_SHOW }/${ seriesId }/season/${ number }`,
        {
            next: {
                revalidate: 60
            }
        }
    );
}

export function getPersons(page: number) {
    return fetchApi<DataShema<PersonShema>>(`person/popular?page=${ page }`,
        {
            next: {
                revalidate: 60
            }
        }
    );
}

export function getPersonById(id: string) {
    return fetchApi<PersonDetailsShema>(
        `person/${ id }?append_to_response=combined_credits,images,external_ids`,
        {
            next: {
                revalidate: 60
            }
        }
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

export function getNetworkById(id: string) {
    return fetchApi<NetworkDetailsShema>(`network/${ id }`);
}

export function getProductionCompanyById(id: string) {
    return fetchApi<ProductionCompanyDetailsShema>(`company/${ id }` );
}