'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren, useState } from 'react';

import { TmdbError } from '@/services/tmdb/api';

const MAX_RETRIES = 1;

const isClientError = (error: Error) => error instanceof TmdbError && error.status >= 400 && error.status < 500;

export default function QueryProvider(props: PropsWithChildren) {
    const [ queryClient ] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                // freshness is owned by the server cache (ISR + fetch revalidate); hydrated data can be hours old,
                // so any finite staleTime would refetch every page on mount and on each window focus
                staleTime: Infinity,
                retry: (failureCount, error) => !isClientError(error) && failureCount < MAX_RETRIES
            }
        }
    }));

    return (
        <QueryClientProvider client={ queryClient }>
            { props.children }

            <ReactQueryDevtools
                initialIsOpen={ false }
                buttonPosition="bottom-right"
            />
        </QueryClientProvider>
    );
}