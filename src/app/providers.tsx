'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

type Props = {
    children: ReactNode;
};

export default function Providers(props: Props) {
    const [queryClient] = useState(
        () => new QueryClient({
            defaultOptions: {
                queries: {
                    staleTime: 0
                }
            }
        }));

    return (
        <QueryClientProvider client={queryClient}>
            {props.children}
        </QueryClientProvider>
    );
}