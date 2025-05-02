import Container from '@/components/ui/layouts/Container';

import Logo from './components/Logo';
import Navigation from './components/Navigation';

export default function Header() {
    return (
        <header className='c-header'>
            <Container
                size='full'
                className='c-header__container'
            >
                <Logo />

                <Navigation />
            </Container>
        </header>
    );
}
