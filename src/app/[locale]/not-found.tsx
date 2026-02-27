import { Metadata } from 'next';
import { getExtracted } from 'next-intl/server';

import Container from '@/components/ui/layouts/Container';
import { pagesHomeUrl } from '@/routes';
import { Link } from '@/services/i18n/navigation';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getExtracted();
        
    return {
        title: '404',
        description: t('The page you are looking for does not exist.')
    };
}

export default async function NotFound() {
    const t = await getExtracted();

    return (
        <Container className="c-error">
            <h2 className="c-error__title">
                <span className="sr-only">{ t('Error') }</span>404
            </h2>

            <p className="c-error__subtitle">
                { t('Sorry, we could not find this page.') }
            </p>

            <p className="c-error__text">
                { t('But dont worry, you can find plenty of other things on home page.') }
            </p>

            <Link
                href={ pagesHomeUrl() }
                className="c-error__button"
            >
                { t('Back to home page') }
            </Link>
        </Container>
    );
}