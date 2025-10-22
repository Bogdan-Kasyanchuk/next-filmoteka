import Logo from '@/components/ui/data-display/Logo';
import Container from '@/components/ui/layouts/Container';

import ButtonScrollToTop from './components/ButtonScrollToTop';

const logos = [
    {
        name: 'Next.js',
        href: 'https://nextjs.org',
        icon: '/svg/logos/next.svg'
    },
    {
        name: 'TailwindCSS',
        href: 'https://tailwindcss.com',
        icon: '/svg/logos/tailwindcss.svg'
    },
    {
        name: 'TanStack',
        href: 'https://tanstack.com',
        icon: '/svg/logos/tanstack.svg'
    }
];

export default function Footer() {
    return (
        <footer className="c-footer">
            <Container
                size="full"
                className="c-footer__container"
            >
                <Logo
                    imgSrc="/svg/logo-white.svg"
                    className="text-primary"
                >
                    <p>Filmoteka</p>
                </Logo>

                <ul className="c-footer__logos">
                    {
                        logos.map(
                            (logo, index) => (
                                <li
                                    key={ index }
                                    className="c-footer__logos-item"
                                >
                                    <img
                                        src={ logo.icon }
                                        alt={ `${ logo.name } icon` }
                                    />

                                    <a
                                        href={ logo.href }
                                        target="_blank"
                                        rel="nofollow noindex noreferrer"
                                        className="u-link-overlay"
                                    >
                                        <span className="sr-only">{ logo.name }</span>
                                    </a>
                                </li>
                            )
                        )
                    }
                </ul>

                <p className="c-footer__text">
                    © 2025. All rights reserved.
                </p>
            </Container>

            <ButtonScrollToTop />
        </footer>
    );
}