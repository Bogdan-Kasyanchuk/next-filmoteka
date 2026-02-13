'use client';

import { useExtracted } from 'next-intl';

import Container from '@/components/ui/layouts/Container';
import { pagesHomeUrl } from '@/routes';
import { Link } from '@/services/i18n/navigation';

export default function Error404() {
    const t = useExtracted();
        
    return (
        <Container className="c-error-404">
            <h2 className="c-error-404__title">
                <span className="sr-only">{ t('Error') }</span>404
            </h2>

            <p className="c-error-404__subtitle">
                { t('Sorry, we could not find this page.') }
            </p>

            <p className="c-error-404__text">
                { t('But dont worry, you can find plenty of other things on homepage.') }
            </p>

            <Link
                href={ pagesHomeUrl() }
                className="c-error-404__button"
            >
                { t('Back to homepage') }
            </Link>
        </Container>
    );
}