'use client';

import PageNotFound from '@/components/ui/data-display/PageNotFound';

export default function NotFound() {
    return (
        <PageNotFound
            title='Could not found tv show'
            link={
                {
                    href: '/tv-shows',
                    text: 'Back to tv-shows'
                }
            }
        />
    );
}