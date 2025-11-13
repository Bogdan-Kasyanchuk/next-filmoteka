import { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { PropsWithChildren } from 'react';

import Footer from '@/components/app/Footer';
import Header from '@/components/app/Header';

import Providers from './providers';

const font = Plus_Jakarta_Sans({ subsets: [ 'latin' ] });

export const metadata: Metadata = {
    title: {
        template: 'Filmoteka | %s',
        default: 'Filmoteka'
    },
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
            'max-snippet': -1,
            'max-video-preview': -1,
            'max-image-preview': 'large'
        }
    },
    metadataBase: new URL('https://next-filmoteka.netlify.app')
};

export default function Layout(props: PropsWithChildren) {
    return (
        <html lang="en">
            <body className={ font.className }>
                <Providers>
                    <Header />

                    <main>{ props.children }</main>

                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
