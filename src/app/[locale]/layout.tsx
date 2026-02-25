import { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { notFound } from 'next/navigation';
import { Locale, NextIntlClientProvider, hasLocale } from 'next-intl';
import { getExtracted, setRequestLocale } from 'next-intl/server';
import { PropsWithChildren } from 'react';

import Footer from '@/components/app/Footer';
import Header from '@/components/app/Header';
import { URLS } from '@/datasets/constants';
import QueryProvider from '@/providers/QueryProvider';
import { routing } from '@/services/i18n/routing';

import '@/styles/app.css';

const font = Plus_Jakarta_Sans({ subsets: [ 'latin' ] });

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
    const t = await getExtracted();

    return {
        title: {
            default: t('Filmoteka'),
            template: `${ t('Filmoteka') } | %s`
        },
        description: t('Movies, series, tv shows, actors and members of film crews.'),
        applicationName: t('Filmoteka'),
        metadataBase: new URL(URLS.SITE)
    };
}

type Props = {
    params: Promise<{ locale: Locale }>
};

export default async function Layout(props: PropsWithChildren<Props>) {
    const { locale } = await props.params;
    
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }
    
    setRequestLocale(locale);
    
    const t = await getExtracted();

    return (
        <html lang={ locale }>
            <body className={ font.className }>
                <NextIntlClientProvider>
                    <QueryProvider>
                        <Header />

                        <main>
                            <h1 className="sr-only">{ t('Filmoteka') }</h1>

                            { props.children }
                        </main>

                        <Footer />
                    </QueryProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}