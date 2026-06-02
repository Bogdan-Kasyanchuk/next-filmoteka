import { Metadata } from 'next';
import { Locale } from 'next-intl';

import { getPathname } from '@/services/i18n/navigation';
import { routing } from '@/services/i18n/routing';

type Props = {
    title: string,
    description: string,
    keywords: string[],
    path: string,
    locale: Locale,
    index?: boolean,
    follow?: boolean
};

export default (props: Props): Metadata => ({
    title: props.title,
    description: props.description,
    keywords: props.keywords,
    alternates: {
        canonical: getPathname({ locale: props.locale, href: props.path }),
        languages: generateLanguages(props.path)
    },
    robots: {
        'index': props.index ?? true,
        'follow': props.follow ?? true,
        'max-snippet': -1,
        'max-video-preview': -1,
        'max-image-preview': 'large'
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

function generateLanguages(path: string) {
    return routing.locales.reduce((acc, cur) => {
        return {
            ...acc,
            [ cur ]: getPathname({ locale: cur, href: path })
        };
    }, {} as Record<string, string>);
}