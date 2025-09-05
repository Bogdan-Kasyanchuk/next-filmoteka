import Link from 'next/link';
import { ReactNode } from 'react';

import Container from '@/components/ui/layouts/Container';

type Props = {
    title: ReactNode;
    link: {
        href: string;
        text: ReactNode;
    };
};

export default function PageNotFound(props: Props) {
    return (
        <Container className='flex flex-col items-center justify-center gap-10'>
            <p className='text-8xl font-bold text-center uppercase text-primary'>
                {props.title}
            </p>

            <Link
                href={props.link.href}
                className='text-5xl text-link font-bold hover:text-link-hover transition-colors'
            >
                {props.link.text}
            </Link>
        </Container>
    );
}