'use client';

import PageNotFound from '@/components/ui/data-display/PageNotFound';
import { pagesPersonsUrl } from '@/routes';

export default function NotFound() {
    return (
        <PageNotFound
            title='Could not found person'
            link={
                {
                    href: pagesPersonsUrl(),
                    text: 'Back to persons'
                }
            }
        />
    );
}