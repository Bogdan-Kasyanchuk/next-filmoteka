'use client';

import PageNotFound from '@/components/ui/data-display/PageNotFound';
import { pagesHomeUrl } from '@/routes';

import '@/styles/app/base.css';

export default function NotFound() {
    return (
        <PageNotFound
            title="Could not found page"
            link={
                {
                    href: pagesHomeUrl(),
                    text: 'Back to home'
                }
            }
        />
    );
}