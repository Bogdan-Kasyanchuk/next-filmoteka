import clsx from 'clsx';
import Image from 'next/image';
import { getExtracted } from 'next-intl/server';
import { PropsWithChildren } from 'react';

import { pagesHomeUrl } from '@/routes';
import { Link } from '@/services/i18n/navigation';

type Props = {
    imgSrc: string,
    className?: string,
    preload?: boolean
};

export default async function Logo(props: PropsWithChildren<Props>) {
    const t = await getExtracted();
        
    return (
        <Link
            href={ pagesHomeUrl() }
            className={ clsx('c-logo u-link', props.className) }
        >
            <Image
                width={ 46 }
                height={ 46 }
                src={ props.imgSrc }
                alt={ t('Logo') }
                className="c-logo__img"
                preload={ props.preload }
                loading={ props.preload ? 'eager' : 'lazy' }
                unoptimized
            />

            { props.children }
        </Link>
    );
}
