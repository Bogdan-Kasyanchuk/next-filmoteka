'use client';

import PageNotFound from '@/components/ui/data-display/PageNotFound';
import { pagesTVUrl } from '@/routes';

export default function NotFound() {
    return (
        <PageNotFound
            title='Could not found season'
            link={
                {
                    href: pagesTVUrl(),
                    text: 'Back to tv-shows'
                }
            }
        />
    );
}
