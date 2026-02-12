import clsx from 'clsx';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

import { pagesHomeUrl } from '@/routes';
import { Link } from '@/services/i18n/navigation';

type Props = {
    imgSrc: string,
    className?: string,
    preload?: boolean
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
                preload={ props.preload }
                loading={ props.preload ? 'eager' : 'lazy' }
                unoptimized
            />

            { props.children }
        </Link>
    );
}
