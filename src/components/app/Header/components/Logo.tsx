import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
    return (
        <Link
            href='/'
            className='c-logo'
        >
            <Image
                width={46}
                height={46}
                src='./svg/logo.svg'
                alt='Logo'
            />
            <h1 className=''>Movie library</h1>
        </Link>
    );
};
