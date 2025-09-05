'use client';

import PageNotFound from '@/components/ui/data-display/PageNotFound';

export default function NotFound() {
    return (
        <PageNotFound
            title='Could not found movie'
            link={
                {
                    href: '/movies',
                    text: 'Back to movies'
                }
            }
        />
    );
}