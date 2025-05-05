import { MovieType, MediaType, TimeType, TVType } from '@/enums';
import { MediaShema, MovieShema, TVShema } from '@/types';

const parameters = {
    API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    LOCALE: process.env.NEXT_PUBLIC_LOCALE,
};

const { API_KEY, BASE_URL, LOCALE } = parameters;

async function fetchApi<T>(url: string) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return (await response.json()) as T;
}

export function getTrendings(type: 'all' | MediaType, time: TimeType, page: number) {
    return fetchApi<MediaShema<MovieShema> | MediaShema<TVShema>>(`${BASE_URL}/trending/${type}/${time}?api_key=${API_KEY}&page=${page}`);
}

export function getMovies(type: MovieType, page: number) {
    return fetchApi(`${BASE_URL}/movie/${type}?api_key=${API_KEY}&page=${page}`);
}

export function getTVs(type: TVType, page: number) {
    return fetchApi(`${BASE_URL}/tv/${type}?api_key=${API_KEY}&page=${page}`);
}

export function getItemById(type: MediaType, id: string) {
    return fetchApi(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=${LOCALE}`);
}

export function getSearchs(type: MediaType, query: string, page: number) {
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