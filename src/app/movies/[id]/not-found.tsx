'use client';

import Link from 'next/link';
export default function NotFound() {
    return (
        <div className='flex flex-col items-center justify-center gap-10 w-full'>
            <p className='text-6xl text-center'>Could not found movie</p>

            <Link
                href="/movies"
                className='text-5xl text-blue-500 hover:underline'
            >
                Back to movies
            </Link>
        </div>
    );
}
