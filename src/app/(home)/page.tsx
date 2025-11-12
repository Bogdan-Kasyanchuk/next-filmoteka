import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';

import { TimeType } from '@/enums';
import { getTrendings } from '@/services/api';

import Content from './components/Content';

import './styles/index.css';

export const metadata: Metadata = {
    title: 'Home'
};

export default async function Page() {
    const queryClient = new QueryClient();

    await Promise.all([
        await queryClient.prefetchQuery(
            {
                queryKey: [ 'trendings', 'all', TimeType.DAY ],
                queryFn: () => getTrendings('all', TimeType.DAY)
            }
        ),
        await queryClient.prefetchQuery(
            {
                queryKey: [ 'trendings', 'all', TimeType.WEEK ],
                queryFn: () => getTrendings('all', TimeType.WEEK)
            }
        )
    ]);

    return (
        <HydrationBoundary state={ dehydrate(queryClient) }>
            <Content />
        </HydrationBoundary>
    );
}