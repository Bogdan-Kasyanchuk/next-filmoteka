'use client';

import Link from 'next/link';
export default function NotFound() {
    return (
        <div className='w-full h-full flex flex-col items-center justify-center gap-10'>
            <p className='text-6xl text-center'>Could not found tv</p>

            <Link
                href="/tv"
                className='text-5xl text-blue-500 hover:underline'
            >
                Back to tvs
            </Link>
        </div>
    );
}
