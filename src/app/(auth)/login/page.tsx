import { Metadata } from 'next';

import Icon from '@/components/ui/data-display/Icon';
import Input from '@/components/ui/inputs/Input';
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
                <div className='p-login__form-fields'>
                    <Input
                        startSection={<Icon name='email' />}
                        type='email'
                        name='email'
                        label='Email'
                        placeholder='email@domain.com'
                        autoComplete='off'
                        // value={value}
                        // error={error}
                        required
                    />

                    <Input
                        startSection={<Icon name='key' />}
                        type='password'
                        label='Password'
                        placeholder='Password'
                    // value={value}
                    // error={error}
                    // onChange={change}
                    />
                </div>

                <button
                    type='submit'
                    className='p-login__form-button'
                >
                    Login
                </button>
            </form>
        </Container>
    );
}