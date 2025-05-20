'use client';

import Link from 'next/link';

import '@/styles/app.css';

export default function NotFound() {
    return (
        <div className='flex flex-col items-center justify-center gap-10 w-full'>
            <p className='text-6xl text-center'>Could not page</p>

            <Link
                href="/"
                className='text-5xl text-blue-500 hover:underline'
            >
                Back to home
            </Link>
        </div>
    );
}
