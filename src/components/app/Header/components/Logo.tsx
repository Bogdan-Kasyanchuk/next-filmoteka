import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
    return (
        <Link
            href='/'
            className='c-logo u-link'
        >
            <Image
                width={46}
                height={46}
                src='./svg/logo.svg'
                alt='Logo'
                className='c-logo__img'
            />
            <h1 className='c-logo__text'>Filmoteka</h1>
        </Link>
    );
};
