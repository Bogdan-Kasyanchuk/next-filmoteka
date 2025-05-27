import Logo from '@/components/ui/data-display/Logo';
import Container from '@/components/ui/layouts/Container';

import Navigation from './components/Navigation';

export default function Header() {
    return (
        <header className='c-header'>
            <Container
                size='full'
                className='c-header__container'
            >
                <Logo
                    logoPath='/svg/logo.svg'
                    text={
                        <h1 className='sr-only lg:not-sr-only'>Filmoteka</h1>
                    }
                    className='text-accent'
                />

                <Navigation />
            </Container>
        </header>
    );
}
