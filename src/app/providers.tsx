import { NextIntlClientProvider } from 'next-intl';
import { PropsWithChildren } from 'react';

import QueryProvider from './queryProvider';

export default function Providers(props: PropsWithChildren) {
    return (
        <NextIntlClientProvider>
            <QueryProvider>
                { props.children }
            </QueryProvider>
        </NextIntlClientProvider>
    );
}