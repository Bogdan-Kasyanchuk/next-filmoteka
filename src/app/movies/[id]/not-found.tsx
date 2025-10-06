'use client';

import PageNotFound from '@/components/ui/data-display/PageNotFound';
import { pagesMoviesUrl } from '@/routes';

export default function NotFound() {
    return (
        <PageNotFound
            title="Could not found movie"
            link={
                {
                    href: pagesMoviesUrl(),
                    text: 'Back to movies'
                }
            }
        />
    );
}