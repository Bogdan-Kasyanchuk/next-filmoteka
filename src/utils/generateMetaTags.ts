import { Metadata } from 'next';
import { Locale } from 'next-intl';

import { getPathname } from '@/services/i18n/navigation';

type Props = {
    title: string,
    description: string,
    path: string,
    locale: Locale
};

// The site is deliberately kept out of search indexes, so there are no keywords, canonical or hreflang;
// Open Graph and Twitter tags stay for link previews in messengers and social networks
export default (props: Props): Metadata => ({
    title: props.title,
    description: props.description,
    robots: {
        index: false,
        follow: false
    },
    openGraph: {
        title: props.title,
        description: props.description,
        url: getPathname({ locale: props.locale, href: props.path }),
        type: 'website',
        images: [
            {
                url: '/og.png',
                width: 1200,
                height: 630,
                alt: 'Filmoteka',
                type: 'image/png'
            }
        ]
    },
    twitter: {
        title: props.title,
        description: props.description,
        card: 'summary_large_image',
        images: '/og.png'
    }
});
