import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
    logoPath: string;
    text: ReactNode;
    className?: string;
};

export default function Logo(props: Props) {
    return (
        <Link
            href='/'
            className={clsx('c-logo u-link', props.className)}
        >
            <Image
                width={46}
                height={46}
                src={props.logoPath}
                alt='Logo'
                className='c-logo__img'
            />
            {props.text}
        </Link>
    );
};
