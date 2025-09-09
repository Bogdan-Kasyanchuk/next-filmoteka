import { Metadata } from 'next';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';

import './_styles/index.css';

export const metadata: Metadata = {
    title: 'Registration',
};

export default async function Page() {

    return (
        <Container className='p-registration'>
            <Title className='p-registration__title'>
                Registration
            </Title>

            <form className='p-registration__form'>
                Registration
            </form>
        </Container>
    );
}