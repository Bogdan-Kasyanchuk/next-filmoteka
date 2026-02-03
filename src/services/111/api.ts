// import { notFound } from 'next/navigation';

// import { PARAMETERS, URLS } from '@/datasets/constants';

// type FetchOptions = {
//     next?: {
//         revalidate?: number
//     }
// };

// export async function fetchApi<T>(
//     path: string,
//     options: FetchOptions = {}
// ): Promise<T> {
//     const isServer = typeof window === 'undefined';

//     const baseUrl = isServer
//         ? URLS.API
//         : '/api/tmdb';

//     const url = new URL(`${ baseUrl }/${ path }`, isServer ? undefined : window.location.origin);

//     const locale = `${ PARAMETERS.LOCALE.language }-${ PARAMETERS.LOCALE.region }`;
    
//     url.searchParams.set('language', locale);

//     if (isServer) {
//         url.searchParams.set('api_key', PARAMETERS.API_KEY);
//     }

//     const fetchOptions: RequestInit & {
//         next?: FetchOptions['next']
//     } = {};

//     if (isServer && options.next) {
//         fetchOptions.next = options.next;
//     }

//     const response = await fetch(url, fetchOptions);

//     if (!response.ok) {

//         if (response.status === 404) {
//             return notFound();
//         }

//         const text = await response.text();
//         throw new Error(text || 'API error');
//     }

//     return response.json() as Promise<T>;
// }