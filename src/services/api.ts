import { MovieType, MediaType, TimeType, TVType } from '@/enums';
import { API_KEY, BASE_URL, LOCALE } from '@/helpers/parameters';
import { DataShema, MovieShema, TVShema } from '@/shemas';

async function fetchApi<T>(url: string) {
    const response = await fetch(url, {
        cache: 'no-store'
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return (await response.json()) as T;
}

export function getTrendings(type: 'all' | MediaType, time: TimeType, page: number) {
    return fetchApi<DataShema<MovieShema> | DataShema<TVShema>>(`${BASE_URL}/trending/${type}/${time}?api_key=${API_KEY}&page=${page}`);
}

export function getMovies(type: MovieType, page: number) {
    return fetchApi<DataShema<MovieShema>>(`${BASE_URL}/movie/${type}?api_key=${API_KEY}&page=${page}`);
}

export function getTVs(type: TVType, page: number) {
    return fetchApi<DataShema<TVShema>>(`${BASE_URL}/tv/${type}?api_key=${API_KEY}&page=${page}`);
}

export function getItemById<T>(type: MediaType, id: string) {
    return fetchApi<T>(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=${LOCALE}`);
}

export function getSearch(type: MediaType, query: string, page: number) {
    return fetchApi(
        `${BASE_URL}/search/${type}?api_key=${API_KEY}&language=${LOCALE}&query=${query}&page=${page}&include_adult=false`,
    );
}

export function getCredits(type: MediaType, id: string) {
    return fetchApi(
        `${BASE_URL}/${type}/${id}/credits?api_key=${API_KEY}&language=${LOCALE}`,
    );
}

export function getReviews(type: MediaType, id: string, page: number) {
    return fetchApi(
        `${BASE_URL}/${type}/${id}/reviews?api_key=${API_KEY}&language=${LOCALE}&page=${page}`,
    );
}

export function getSimilars(type: MediaType, id: string, page: number) {
    return fetchApi(
        `${BASE_URL}/${type}/${id}/similar?api_key=${API_KEY}&language=${LOCALE}&page=${page}`,
    );
}

export function getVideos(type: MediaType, id: string, page: number) {
    return fetchApi(
        `${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}&language=${LOCALE}&page=${page}`,
    );
}