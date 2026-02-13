import { getExtracted } from 'next-intl/server';

import Logo from '@/components/ui/data-display/Logo';
import Container from '@/components/ui/layouts/Container';

import ButtonScrollToTop from './components/ButtonScrollToTop';
import { LOGOS } from './datasets';

export default async function Footer() {
    const t = await getExtracted();
        
    return (
        <footer className="c-footer">
            <Container
                size="full"
                className="c-footer__container"
            >
                <ul className="c-footer__logos">
                    {
                        LOGOS.map(
                            (logo, index) => (
                                <li
                                    key={ index }
                                    className="c-footer__logos-item"
                                >
                                    <img
                                        src={ logo.icon }
                                        alt={ logo.name }
                                        loading="lazy"
                                    />

                                    <a
                                        href={ logo.href }
                                        target="_blank"
                                        rel="nofollow noindex noreferrer"
                                        className="u-overlay u-link"
                                    >
                                        <span className="sr-only">{ logo.name }</span>
                                    </a>
                                </li>
                            )
                        )
                    }
                </ul>

                <Logo
                    imgSrc="/svg/logo-white.svg"
                    className="text-primary"
                >
                    { t('Filmoteka') }
                </Logo>
            </Container>

            <ButtonScrollToTop />
        </footer>
    );
}