import { Plus_Jakarta_Sans } from 'next/font/google';

import Container from '@/components/ui/layouts/Container';

import type { Metadata } from 'next';

import '@/styles/app.css';

const font = Plus_Jakarta_Sans({ subsets: [ 'latin' ] });
 
export const metadata: Metadata = {
    title: 'Filmoteka | 404',
    description: 'The page you are looking for does not exist.'
};

export default function GlobalNotFound() {
    return (
        <html lang="en">
            <body className={ font.className }>
                <main>
                    <Container className="flex items-center justify-center text-primary w-full flex-col gap-5 text-center">
                        <h1 className="uppercase text-[128px] font-bold leading-none">
                            <span className="sr-only">Error</span>404
                        </h1>

                        <p className="mt-5 text-5xl leading-[1.2]">
                            Sorry, we could not find this page.
                        </p>

                        <p className="text-md leading-[1.2] opacity-75">
                            But dont worry, you can find plenty of other things on homepage.
                        </p>
                    </Container>
                </main>
            </body>
        </html>
    );
}
