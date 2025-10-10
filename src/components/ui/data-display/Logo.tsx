import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

import { pagesHomeUrl } from '@/routes';

type Props = {
    imgSrc: string,
    className?: string
};

export default function Logo(props: PropsWithChildren<Props>) {
    return (
        <Link
            href={ pagesHomeUrl() }
            className={ clsx('c-logo u-link', props.className) }
        >
            <Image
                width={ 46 }
                height={ 46 }
                src={ props.imgSrc }
                alt="Logo"
                className="c-logo__img"
            />

            { props.children }
        </Link>
    );
}
