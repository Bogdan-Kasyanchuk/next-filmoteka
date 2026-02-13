import { PropsWithChildren } from 'react';

import '@/styles/app/base.css';

export default function RootLayout(props: PropsWithChildren) {
    return props.children;
}
