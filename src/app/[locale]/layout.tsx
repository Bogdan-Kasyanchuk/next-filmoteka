import { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import { PropsWithChildren } from 'react';

import Footer from '@/components/app/Footer';
import Header from '@/components/app/Header';
import { PARAMETERS } from '@/helpers/parameters';

import Providers from '../providers';

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
    metadataBase: new URL(PARAMETERS.SITE_URL)
};

export default async function Layout(props: PropsWithChildren) {
    const locale = await getLocale();

    return (
        <Providers>
            <html lang={ locale }>
                <body className={ font.className }>
                    <Header />

                    <main>
                        <h1 className="sr-only">Filmoteka</h1>
                        
                        { props.children }
                    </main>

                    <Footer />
                </body>
            </html>
        </Providers>
    );
}