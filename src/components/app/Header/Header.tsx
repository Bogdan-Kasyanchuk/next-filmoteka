import Logo from '@/components/ui/data-display/Logo';
import Container from '@/components/ui/layouts/Container';

import Navigation from './components/Navigation';
import SwitchLocale from './components/SwitchLocale';

export default function Header() {
    return (
        <header className="c-header">
            <Container
                size="full"
                className="c-header__container"
            >
                <Logo
                    imgSrc="/svg/logo.svg"
                    className="text-accent"
                    preload
                >
                    <span className="max-md:sr-only">
                        Filmoteka
                    </span>
                </Logo>

                <SwitchLocale />

                <Navigation />
            </Container>
        </header>
    );
}
