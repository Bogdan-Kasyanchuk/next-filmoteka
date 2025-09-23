import { Metadata } from 'next';

import Icon from '@/components/ui/data-display/Icon';
import Input from '@/components/ui/inputs/Input';
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
                <div className='p-registration__form-fields'>
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

                    <Input
                        startSection={<Icon name='key' />}
                        type='password'
                        label='Confirm password'
                        placeholder='Confirm password'
                    // value={value}
                    // error={error}
                    // onChange={change}
                    />
                </div>

                <button
                    type='submit'
                    className='p-registration__form-button'
                >
                    Registration
                </button>
            </form>
        </Container>
    );
}