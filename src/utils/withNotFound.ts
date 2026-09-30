import { notFound } from 'next/navigation';

import { TmdbError } from '@/services/tmdb/api';

export default async <T>(promise: Promise<T>): Promise<T> => {
    try {
        return await promise;
    } catch (error) {
        if (error instanceof TmdbError && error.status === 404) {
            notFound();
        }

        throw error;
    }
};
