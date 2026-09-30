'use client';

import { ImageLoaderProps } from 'next/image';

import { PARAMETERS } from '@/datasets/constants';

// Images are served straight from TMDB's CDN instead of the Next.js optimizer:
// TMDB already hosts every size, and the optimizer made each image a request to our host.
// Any of these widths works for posters, backdrops, profiles and logos alike.
const TMDB_WIDTHS = [ 92, 154, 185, 300, 342, 500, 780, 1280 ];
const RESIZABLE_SIZE = /^(w\d+|h\d+|original)$/;

const TMDB_PREFIX = `${ PARAMETERS.IMAGE_URL }/`;

// the unused `w` keeps Next.js from warning that the loader ignores width
const withWidthParam = (src: string, width: number) => `${ src }${ src.includes('?') ? '&' : '?' }w=${ width }`;

export default function imageLoader({ src, width }: ImageLoaderProps) {
    if (!src.startsWith(TMDB_PREFIX)) {
        return withWidthParam(src, width);
    }

    const [ size, ...file ] = src.slice(TMDB_PREFIX.length).split('/');

    // fixed crops such as w180_and_h180_face exist in one size only
    if (!RESIZABLE_SIZE.test(size)) {
        return withWidthParam(src, width);
    }

    const tmdbWidth = TMDB_WIDTHS.find(tmdbWidth => tmdbWidth >= width);

    return `${ TMDB_PREFIX }${ tmdbWidth ? `w${ tmdbWidth }` : 'original' }/${ file.join('/') }`;
}
