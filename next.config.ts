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
        createMessagesDeclaration: './src/messages/en.json'
    }
});

export default withNextIntl(nextConfig);
