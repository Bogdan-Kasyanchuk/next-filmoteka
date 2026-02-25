'use client';

import { Plus_Jakarta_Sans } from 'next/font/google';

import Container from '@/components/ui/layouts/Container';

import '@/styles/app.css';

const font = Plus_Jakarta_Sans({ subsets: [ 'latin' ] });

type Props = {
    error: Error,
    reset: () => void
};

export default function GlobalError(props: Props) {
    return (
        <html lang="en">
            <body className={ font.className }>
                <main>
                    <Container className="flex items-center justify-center text-primary w-full flex-col gap-5 text-center">
                        <p className="uppercase text-9xl font-bold leading-none">
                                Something globally went wrong
                        </p>

                        <p className="text-md leading-[1.2] opacity-75">
                            { props.error.message }
                        </p>

                        <button
                            type="button"
                            className="flex items-center justify-center text-lg px-4 py-2 w-fit min-h-[50px] mt-5 rounded-sm bg-active text-secondary uppercase min-w-[300px] font-bold transition-opacity hover:opacity-75"
                            onClick={
                                () => {
                                    props.reset();
                                }
                            }
                        >
                                Try again
                        </button>
                    </Container>
                </main>
            </body>
        </html>
    );
}
