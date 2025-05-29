'use client';

import Link from 'next/link';

import Container from '@/components/ui/layouts/Container';

import '@/styles/app/base.css';

export default function NotFound() {
    return (
        <Container className='flex flex-col items-center justify-center gap-10'>
            <p className='text-6xl text-center'>Could not page</p>

            <Link
                href="/"
                className='text-5xl text-blue-500 hover:underline'
            >
                Back to home
            </Link>
        </Container>
    );
}
