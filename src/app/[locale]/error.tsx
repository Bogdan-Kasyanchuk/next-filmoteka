'use client'; 

import { useExtracted } from 'next-intl';

import Container from '@/components/ui/layouts/Container';

type Props = {
    error: Error,
    reset: () => void
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

            <button
                className="c-error__button"
                onClick={
                    () => {
                        props.reset();
                    } 
                }
            >
                { t('Try again') }
            </button>
        </Container>
    );
}
