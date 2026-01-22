import { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { PropsWithChildren } from 'react';

import Footer from '@/components/app/Footer';
import Header from '@/components/app/Header';
import { PARAMETERS } from '@/helpers/parameters';

import Providers from './providers';

const font = Plus_Jakarta_Sans({ subsets: [ 'latin' ] });

export const metadata: Metadata = {
    title: {
        default: 'Filmoteka',
        template: 'Filmoteka | %s'
    },
    robots: {
        index: false,
        follow: false
    },
    applicationName: 'Filmoteka',
    metadataBase: new URL(PARAMETERS.SITE_URL)
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