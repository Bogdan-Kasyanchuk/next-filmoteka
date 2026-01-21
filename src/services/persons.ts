import { cache } from 'react';

import { getPersonById } from './api';

export const getPersonByIdCached = cache(
    async (id: string) => getPersonById(id)
);