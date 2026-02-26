'use client';

import { Plus_Jakarta_Sans } from 'next/font/google';

import Container from '@/components/ui/layouts/Container';
import { pagesHomeUrl } from '@/routes';
import { Link } from '@/services/i18n/navigation';

import '@/styles/app.css';

const font = Plus_Jakarta_Sans({ subsets: [ 'latin' ] });

type Props = {
    error: Error
};

export default function GlobalError(props: Props) {
    return (
        <html lang="en">
            <body className={ font.className }>
                <main>
                    <Container className="flex-center text-primary w-full flex-col gap-5 text-center">
                        <p className="uppercase text-9xl font-bold leading-none">
                            Oops, something went wrong. Please try again later.
                        </p>

                        <p className="text-md leading-[1.2] opacity-75">
                            { props.error.message }
                        </p>

                        <Link
                            href={ pagesHomeUrl() }
                            className="flex items-center justify-center text-lg px-4 py-2 w-fit min-h-[50px] mt-5 rounded-sm bg-active text-secondary uppercase min-w-[300px] font-bold transition-opacity hover:opacity-75"
                        >
                            Back to home page
                        </Link>
                    </Container>
                </main>
            </body>
        </html>
    );
}
