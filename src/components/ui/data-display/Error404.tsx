import Link from 'next/link';

import Container from '@/components/ui/layouts/Container';
import { pagesHomeUrl } from '@/routes';

export default function Error404() {
    return (
        <Container className="c-error-404">
            <h2 className="c-error-404__title">
                <span className="sr-only">Error</span>404
            </h2>

            <p className="c-error-404__subtitle">
                Sorry, we couldn&apos;t find this page.
            </p>

            <p className="c-error-404__text">
                But dont worry, you can find plenty of other things on homepage.
            </p>

            <Link
                href={ pagesHomeUrl() }
                className="c-error-404__button"
            >
                Back to homepage
            </Link>
        </Container>
    );
}