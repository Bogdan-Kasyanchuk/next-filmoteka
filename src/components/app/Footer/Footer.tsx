import Logo from '@/components/ui/data-display/Logo';
import Container from '@/components/ui/layouts/Container';

import ButtonScrollToTop from './components/ButtonScrollToTop';

export default function Footer() {
    return (
        <footer className='c-footer'>
            <Container
                size='full'
                className='c-footer__container'
            >
                <Logo
                    logoPath='/svg/logo-white.svg'
                    text={
                        <p>Filmoteka</p>
                    }
                    className='text-primary'
                />
            </Container>

            <ButtonScrollToTop />
        </footer>
    );
}
