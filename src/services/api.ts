const parameters = {
    API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
};

const { API_KEY, BASE_URL, } = parameters;

async function fetchApi<T>(url: string) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return (await response.json()) as T;
}

export function getTrendings(type: 'all' | 'movie' | 'tv', time: 'day' | 'week', page: number) {
    return fetchApi(`${BASE_URL}/trending/${type}/${time}?api_key=${API_KEY}&page=${page}`);
}

export function getMovies(type: 'now_playing' | 'popular' | 'top_rated' | 'upcoming', page: number) {
    return fetchApi(`${BASE_URL}/movie/${type}?api_key=${API_KEY}&page=${page}`);
}

export function getTVs(type: 'airing_today' | 'on_the_air' | 'popular' | 'top_rated', page: number) {
    return fetchApi(`${BASE_URL}/tv/${type}?api_key=${API_KEY}&page=${page}`);
}

export function getItemById(type: 'movie' | 'tv', id: string) {
    return fetchApi(`${BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=en-US`);
}

export function getSearchs(type: 'movie' | 'tv', query: string, page: number) {
    return fetchApi(
        `${BASE_URL}/search/${type}?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`,
    );
}

export function getCredits(type: 'movie' | 'tv', id: string) {
    return fetchApi(
        `${BASE_URL}/${type}/${id}/credits?api_key=${API_KEY}&language=en-US`,
    );
}

export function getReviews(type: 'movie' | 'tv', id: string, page: number) {
    return fetchApi(
        `${BASE_URL}/${type}/${id}/reviews?api_key=${API_KEY}&language=en-US&page=${page}`,
    );
}

export function getSimilars(type: 'movie' | 'tv', id: string, page: number) {
    return fetchApi(
        `${BASE_URL}/${type}/${id}/similar?api_key=${API_KEY}&language=en-US&page=${page}`,
    );
}

export function getVideos(type: 'movie' | 'tv', id: string, page: number) {
    return fetchApi(
        `${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}&language=en-US&page=${page}`,
    );
}