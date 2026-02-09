import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactCompiler: true,
    logging: {
        fetches: {
            fullUrl: true
        }
    },
    experimental: {
        inlineCss: true
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

export default nextConfig;
