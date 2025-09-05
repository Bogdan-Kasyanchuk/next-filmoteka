'use client';

import PageNotFound from '@/components/ui/data-display/PageNotFound';

export default function NotFound() {
    return (
        <PageNotFound
            title='Could not found person'
            link={
                {
                    href: '/persons',
                    text: 'Back to persons'
                }
            }
        />
    );
}