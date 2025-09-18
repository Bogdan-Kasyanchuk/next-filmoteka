'use client';

import PageNotFound from '@/components/ui/data-display/PageNotFound';
import { pagesMovieshUrl } from '@/routes';

export default function NotFound() {
    return (
        <PageNotFound
            title='Could not found movie'
            link={
                {
                    href: pagesMovieshUrl(),
                    text: 'Back to movies'
                }
            }
        />
    );
}