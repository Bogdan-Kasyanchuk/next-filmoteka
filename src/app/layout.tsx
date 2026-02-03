import { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { PropsWithChildren } from 'react';

import Footer from '@/components/app/Footer';
import Header from '@/components/app/Header';
import { URLS } from '@/datasets/constants';

import Providers from './providers';

const font = Plus_Jakarta_Sans({ subsets: [ 'latin' ] });

export const metadata: Metadata = {
    title: {
        default: 'Filmoteka',
        template: 'Filmoteka | %s'
    },
    applicationName: 'Filmoteka',
    robots: {
        index: false,
        follow: false
    },
    metadataBase: new URL(URLS.SITE)
};

export default function Layout(props: PropsWithChildren) {
    return (
        <html lang="en">
            <body className={ font.className }>
                <Providers>
                    <Header />

                    <main>
                        <h1 className="sr-only">Filmoteka</h1>
                        
                        { props.children }
                    </main>

                    <Footer />
                </Providers>
            </body>
        </html>
    );
}