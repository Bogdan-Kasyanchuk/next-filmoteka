import { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { notFound } from 'next/navigation';
import { Locale, NextIntlClientProvider, hasLocale } from 'next-intl';
import { getExtracted, setRequestLocale } from 'next-intl/server';
import { PropsWithChildren, Suspense } from 'react';

import Footer from '@/components/app/Footer';
import Header from '@/components/app/Header';
import NavigationProgress from '@/components/app/NavigationProgress';
import { PARAMETERS } from '@/datasets/constants';
import QueryProvider from '@/providers/QueryProvider';
import { routing } from '@/services/i18n/routing';

import '@/styles/app.css';

const font = Manrope({ subsets: [ 'latin', 'cyrillic' ] });

type Props = {
    params: Promise<{ locale: Locale }>
};

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { locale } = await props.params;
    
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    const t = await getExtracted({ locale });

    return {
        title: {
            default: t('Filmoteka'),
            template: `${ t('Filmoteka') } | %s`
        },
        description: t('Movies, series, tv shows, actors and members of film crews.'),
        applicationName: t('Filmoteka'),
        metadataBase: new URL(PARAMETERS.APP_URL)
    };
}

export default async function Layout(props: PropsWithChildren<Props>) {
    const { locale } = await props.params;
    
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);

    const t = await getExtracted({ locale });

    return (
        <html
            lang={ locale }
            data-scroll-behavior="smooth"
        >
            <body className={ font.className }>
                <NextIntlClientProvider>
                    <QueryProvider>
                        <Suspense fallback={ null }>
                            <NavigationProgress />
                        </Suspense>

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