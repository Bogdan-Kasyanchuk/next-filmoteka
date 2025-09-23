'use client';

import PageNotFound from '@/components/ui/data-display/PageNotFound';
import { pagesTVShowsUrl } from '@/routes';

export default function NotFound() {
    return (
        <PageNotFound
            title='Could not found tv show'
            link={
                {
                    href: pagesTVShowsUrl(),
                    text: 'Back to tv-shows'
                }
            }
        />
    );
}