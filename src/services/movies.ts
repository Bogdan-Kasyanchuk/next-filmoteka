import { cache } from 'react';

import { getCurrentMovieById, getMovieById } from './api';

export const getMovieByIdCached = cache(
    async (id: string) => getMovieById(id)
);

export const getCurrentMovieByIdCached = cache(
    async (id: string) => getCurrentMovieById(id)
);