import createNextIntlPlugin from 'next-intl/plugin';

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactCompiler: true,
    logging: {
        fetches: {
            fullUrl: true
        }
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'image.tmdb.org'
            }
        ]
    }
};

const withNextIntl = createNextIntlPlugin({
    requestConfig: './src/services/i18n/request.ts',
    experimental: {
        srcPath: './src', 
        extract: {
            sourceLocale: 'en'
        }, 
        messages: {
            path: './src/messages',
            format: 'json',
            locales: 'infer',
            precompile: true
        }
    }
});

export default withNextIntl(nextConfig);
