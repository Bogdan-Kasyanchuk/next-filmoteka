'use client';

import { useExtracted } from 'next-intl';

import Container from '@/components/ui/layouts/Container';
import { pagesHomeUrl } from '@/routes';
import { Link } from '@/services/i18n/navigation';

type Props = {
    error: Error
};

export default function Error(props: Props) {
    const t = useExtracted();
        
    return (
        <Container className="c-error">
            <p className="c-error__subtitle">
                { t('Oops, something went wrong. Please try again later.') }
            </p>

            <p className="c-error__text">
                { props.error.message }
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