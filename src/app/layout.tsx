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
    description: 'Library of movies, series, TV shows, actors',
    keywords: 'Movies, series, TV shows, actors'
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
