'use client';

import { Plus_Jakarta_Sans } from 'next/font/google';

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
                    <div className="flex items-center justify-center size-full px-5 flex-col">
                        <p className="text-5xl text-primary font-bold leading-[1.2] text-center">
                            Something globally went wrong
                        </p>

                        <p className="text-md leading-[1.2]">
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
                    </div>
                </main>
            </body>
        </html>
    );
}
