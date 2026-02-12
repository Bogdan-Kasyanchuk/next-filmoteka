'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren, useState } from 'react';

export default function QueryProvider(props: PropsWithChildren) {
    const [ queryClient ] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
                retry: 1
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