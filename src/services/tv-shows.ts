import { cache } from 'react';

import { getCurrentTVShowById, getTVShowById } from './api';

export const getTVShowByIdCached = cache(
    async (id: string) => getTVShowById(id)
);

export const getCurrentTVShowByIdCached = cache(
    async (id: string) => getCurrentTVShowById(id)
);