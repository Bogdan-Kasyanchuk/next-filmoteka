'use client';

import { Plus_Jakarta_Sans } from 'next/font/google';

const font = Plus_Jakarta_Sans({ subsets: [ 'latin' ] });

export default function Error() {
    return (
        <html lang="en">
            <body className={ font.className }>
                <main>
                    <div className="flex items-center justify-center w-full px-5">
                        <p className="text-5xl text-primary font-bold leading-[1.2] text-center">
                            Something globally went wrong
                        </p>
                    </div>
                </main>
            </body>
        </html>
    );
}
