import { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { notFound } from 'next/navigation';
import { Locale, NextIntlClientProvider, hasLocale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { PropsWithChildren } from 'react';

import Footer from '@/components/app/Footer';
import Header from '@/components/app/Header';
import { URLS } from '@/datasets/constants';
import QueryProvider from '@/providers/QueryProvider';
import { routing } from '@/services/i18n/routing';

const font = Plus_Jakarta_Sans({ subsets: [ 'latin' ] });

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
}

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

type Props = {
    params: Promise<{ locale: Locale }>
};

export default async function Layout(props: PropsWithChildren<Props>) {
    const { locale } = await props.params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);

    return (
        <html lang={ locale }>
            <body className={ font.className }>
                <NextIntlClientProvider>
                    <QueryProvider>
                        <Header />

                        <main>
                            <h1 className="sr-only">Filmoteka</h1>

                            { props.children }
                        </main>

                        <Footer />
                    </QueryProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}