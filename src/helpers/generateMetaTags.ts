import { Metadata } from 'next';

type Props = {
    title: string,
    description: string,
    keywords: string[],
    url: string
};

export default (props: Props): Metadata => ({
    title: props.title,
    description: props.description,
    keywords: props.keywords,
    alternates: {
        canonical: props.url
    },
    robots: {
        'index': true,
        'follow': true,
        'max-snippet': -1,
        'max-video-preview': -1,
        'max-image-preview': 'large'
    },
    openGraph: {
        title: props.title,
        description: props.description,
        url: props.url,
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