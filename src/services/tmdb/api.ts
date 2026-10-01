import { Locale } from 'next-intl';

import { PARAMETERS } from '@/datasets/constants';

import { getRevalidate, isAllowedPath } from './allowedPaths';

type FetchOptions = {
    params?: Record<string, string | number>
};

export class TmdbError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);

        this.name = 'TmdbError';
        this.status = status;
    }
}

// TMDB filters videos by `language`; also take English and language-neutral ones,
// otherwise most titles have no trailers outside English
export const getVideoLanguages = (locale: Locale) => locale === 'en'
    ? 'en,null'
    : `${ locale },en,null`;

export async function fetchApi<T>(
    path: string,
    locale: Locale,
    options: FetchOptions = {}
): Promise<T> {
    if (!isAllowedPath(path)) {
        throw new TmdbError(404, `Path is not allowed: ${ path }`);
    }

    const isServer = typeof window === 'undefined';

    const baseUrl = isServer
        ? PARAMETERS.API_URL
        : '/api/tmdb';

    const url = new URL(`${ baseUrl }/${ path }`, isServer ? undefined : window.location.origin);

    Object.entries(options.params ?? {}).forEach(([ key, value ]) => {
        url.searchParams.set(key, String(value));
    });

    url.searchParams.set(
        'language',
        PARAMETERS.LOCALES[ locale as keyof typeof PARAMETERS.LOCALES ]
    );

    if (isServer) {
        url.searchParams.set('api_key', PARAMETERS.API_KEY);
    }

    // on the client the proxy caches; on the server Next.js keeps the response in its data cache
    const response = await fetch(url, isServer ? { next: { revalidate: getRevalidate(path) } } : {});

    if (!response.ok) {
        const text = await response.text();

        throw new TmdbError(response.status, text || 'Internal server error');
    }

    return response.json() as Promise<T>;
}
