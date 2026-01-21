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

type Options = {
    next?: {
        revalidate?: number,
        tags?: string[]
    }
};

async function fetchApi<T>(path: string, options: Options = {}) {
    const isServer = typeof window === 'undefined';

    const baseUrl = isServer ? PARAMETERS.API_URL : '/api/tmdb';

    let url: URL;
    const fetchOptions: Options = {};

    if (isServer) {
        fetchOptions.next = options.next,

        url = new URL(`${ baseUrl }/${ path }`);
        url.searchParams.append('api_key', PARAMETERS.API_KEY);
        url.searchParams.append('language', PARAMETERS.LOCALE);
    } else {
        url = new URL(`${ baseUrl }/${ path }`, window.location.origin);
    }
    
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return (await response.json()) as T;
}

export function getTrendings(type: 'all' | MediaType, time: TimeType, page = 1) {
    return fetchApi<DataShema<MovieShema | TVShowShema | PersonShema>>(
        `trending/${ type }/${ time }?page=${ page }`,
        {
            next: {
                revalidate: 60,
                tags: [ 'trendings', type, time, page.toString() ]
            }
        }
    );
}

export function getMovies(type: MovieType, page: number) {
    return fetchApi<DataShema<MovieShema>>(`${ MediaType.MOVIE }/${ type }?page=${ page }`,
        {
            next: {
                revalidate: 60,
                tags: [ 'movies', type, page.toString() ]
            }
        }
    );
}

export function getMovieById(id: string) {
    return fetchApi<MovieDetailsShema>(
        `${ MediaType.MOVIE }/${ id }?append_to_response=credits,videos,reviews,recommendations,external_ids`,
        {
            next: {
                revalidate: 60,
                tags: [ 'movies', id ]
            }
        }
    );
}

export function getCurrentMovieById(id: string) {
    return fetchApi<CurrentMovieShema>(`${ MediaType.MOVIE }/${ id }`,
        {
            next: {
                revalidate: 60,
                tags: [ 'movies', 'current', id ]
            }
        }
    );
}

export function getSimilarMovies(id: string, page: number) {
    return fetchApi<DataShema<SimilarMovieShema>>(
        `${ MediaType.MOVIE }/${ id }/similar?page=${ page }`,
        {
            next: {
                revalidate: 60,
                tags: [ 'movies', id, 'similar', page.toString() ]
            }
        }
    );
}

export function getRecommendationsMovies(id: string, page: number) {
    return fetchApi<DataShema<MovieShema>>(
        `${ MediaType.MOVIE }/${ id }/recommendations?page=${ page }`,
        {
            next: {
                revalidate: 60,
                tags: [ 'movies', id, 'recommendations', page.toString() ]
            }
        }
    );
}

export function getReviewsToMovie(id: string, page: number) {
    return fetchApi<DataShema<ReviewShema>>(
        `${ MediaType.MOVIE }/${ id }/reviews?page=${ page }`,
        {
            next: {
                revalidate: 60,
                tags: [ 'movies', id, 'reviews', page.toString() ]
            }
        }
    );
}

export function getTVShows(type: TVShowType, page: number) {
    return fetchApi<DataShema<TVShowShema>>(`${ MediaType.TV_SHOW }/${ type }?page=${ page }`,
        {
            next: {
                revalidate: 60,
                tags: [ 'tv-shows', page.toString() ]
            }
        }
    );
}

export function getTVShowById(id: string) {
    return fetchApi<TVShowDetailsShema>(
        `${ MediaType.TV_SHOW }/${ id }?append_to_response=credits,videos,reviews,recommendations,external_ids`,
        {
            next: {
                revalidate: 60,
                tags: [ 'tv-shows', id ]
            }
        }
    );
}

export function getCurrentTVShowById(id: string) {
    return fetchApi<CurrentTVShowShema>(`${ MediaType.TV_SHOW }/${ id }`,
        {
            next: {
                revalidate: 60,
                tags: [ 'tv-shows', 'current', id ]
            }
        }
    );
}

export function getSimilarTVShow(id: string, page: number) {
    return fetchApi<DataShema<SimilarTVShowShema>>(
        `${ MediaType.TV_SHOW }/${ id }/similar?page=${ page }`,
        {
            next: {
                revalidate: 60,
                tags: [ 'tv-shows', id, 'similar', page.toString() ]
            }
        }
    );
}

export function getRecommendationsTVShow(id: string, page: number) {
    return fetchApi<DataShema<TVShowShema>>(
        `${ MediaType.TV_SHOW }/${ id }/recommendations?page=${ page }`,
        {
            next: {
                revalidate: 60,
                tags: [ 'tv-shows', id, 'recommendations', page.toString() ]
            }
        }
    );
}

export function getReviewsToTVShow(id: string, page: number) {
    return fetchApi<DataShema<ReviewShema>>(
        `${ MediaType.TV_SHOW }/${ id }/reviews?page=${ page }`,
        {
            next: {
                revalidate: 60,
                tags: [ 'tv-shows', id, 'reviews', page.toString() ]
            }
        }
    );
}

export function getTVShowSeasonByNumber(seriesId: string, number: number) {
    return fetchApi<TVShowSeasonDetailsShema>(`${ MediaType.TV_SHOW }/${ seriesId }/season/${ number }`,
        {
            next: {
                revalidate: 60,
                tags: [ 'tv-shows', seriesId, number.toString() ]
            }
        }
    );
}

export function getPersons(page: number) {
    return fetchApi<DataShema<PersonShema>>(`person/popular?page=${ page }`,
        {
            next: {
                revalidate: 60,
                tags: [ 'persons', page.toString() ]
            }
        }
    );
}

export function getPersonById(id: string) {
    return fetchApi<PersonDetailsShema>(
        `person/${ id }?append_to_response=combined_credits,images,external_ids`,
        {
            next: {
                revalidate: 60,
                tags: [ 'persons', id ]
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