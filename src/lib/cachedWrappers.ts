import { cache } from 'react';

import {
    getCurrentMovieById,
    getCurrentTVShowById,
    getMovieById,
    getPersonById,
    getTVShowById
} from '@/services/api';

export const getMovieByIdCached = cache(
    async (id: string) => getMovieById(id)
);

export const getCurrentMovieByIdCached = cache(
    async (id: string) => getCurrentMovieById(id)
);

export const getTVShowByIdCached = cache(
    async (id: string) => getTVShowById(id)
);

export const getCurrentTVShowByIdCached = cache(
    async (id: string) => getCurrentTVShowById(id)
);

export const getPersonByIdCached = cache(
    async (id: string) => getPersonById(id)
);