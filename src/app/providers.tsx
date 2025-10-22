'use client';

import { QueryClient, QueryClientProvider, isServer } from '@tanstack/react-query';
import { ReactNode } from 'react';

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
                retry: 1
            }
        }
    });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
    if (isServer) {
        return makeQueryClient();
    } else {
        if (!browserQueryClient) {
            browserQueryClient = makeQueryClient();
        }

        return browserQueryClient;
    }
}

type Props = {
    children: ReactNode
};

export default function Providers(props: Props) {
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={ queryClient }>
            { props.children }
        </QueryClientProvider>
    );
}