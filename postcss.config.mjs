import path from 'node:path';

/** @type {import('postcss-load-config').Config} */
const config = {
    plugins: {
        'postcss-import': {
            resolve(id) {
                if (id.startsWith('@/')) {
                    return path.resolve(process.cwd(), 'src', id.slice(2));
                }

                return id;
            }
        }, 
        '@tailwindcss/nesting': {},
        '@tailwindcss/postcss': {}
    }
};

export default config;