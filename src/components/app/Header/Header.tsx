import Logo from '@/components/ui/data-display/Logo';
import Container from '@/components/ui/layouts/Container';

import Navigation from './components/Navigation';

export default function Header() {
    return (
        <header className="c-header">
            <Container
                size="full"
                className="c-header__container"
            >
                <Logo
                    logoPath="/svg/logo.svg"
                    className="text-accent"
                >
                    <h1 className="sr-only md:not-sr-only">Filmoteka</h1>
                </Logo>

                <Navigation />
            </Container>
        </header>
    );
}
