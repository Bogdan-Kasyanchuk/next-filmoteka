import { Metadata } from 'next';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';

import './_styles/index.css';

export const metadata: Metadata = {
    title: 'Login',
};

export default async function Page() {

    return (
        <Container className='p-login'>
            <Title className='p-login__title'>
                Login
            </Title>

            <form className='p-login__form'>
                Login
            </form>
        </Container>
    );
}