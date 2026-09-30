import { NextResponse } from 'next/server';

import { PARAMETERS } from '@/datasets/constants';
import { getRevalidate, isAllowedPath } from '@/services/tmdb/allowedPaths';
import logRequest from '@/utils/logRequest';

type Params = {
    params: Promise<{ path: string[] }>
};

const ALLOWED_QUERY_PARAMS: Record<string, (value: string) => boolean> = {
    page: value => /^[1-9]\d{0,2}$/.test(value),
    language: value => Object.values<string>(PARAMETERS.LOCALES).includes(value),
    query: value => value.length <= 200,
    include_adult: value => value === 'true' || value === 'false',
    include_video_language: value => /^[a-z]{2}(,[a-z]{2})*,null$/.test(value),
    append_to_response: value => [
        'credits,external_ids,videos,similar',
        'combined_credits,images,external_ids'
    ].includes(value)
};

const hasAllowedQuery = (searchParams: URLSearchParams) => [ ...searchParams ].every(
    ([ key, value ]) => ALLOWED_QUERY_PARAMS[ key ]?.(value) ?? false
);

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 60;
const RATE_LIMIT_MAX_CLIENTS = 10_000;

const UPSTREAM_TIMEOUT_MS = 8_000;

const requestTimestampsByIp = new Map<string, number[]>();

const removeExpiredClients = (now: number) => {
    requestTimestampsByIp.forEach((timestamps, identifier) => {
        if (now - timestamps[ timestamps.length - 1 ] >= RATE_LIMIT_WINDOW_MS) {
            requestTimestampsByIp.delete(identifier);
        }
    });

    if (requestTimestampsByIp.size >= RATE_LIMIT_MAX_CLIENTS) {
        requestTimestampsByIp.clear();
    }
};

const isRateLimited = (identifier: string) => {
    const now = Date.now();

    if (!requestTimestampsByIp.has(identifier) && requestTimestampsByIp.size >= RATE_LIMIT_MAX_CLIENTS) {
        removeExpiredClients(now);
    }

    const recentTimestamps = (requestTimestampsByIp.get(identifier) ?? [])
        .filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW_MS);

    if (recentTimestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
        requestTimestampsByIp.set(identifier, recentTimestamps);

        return true;
    }

    recentTimestamps.push(now);
    requestTimestampsByIp.set(identifier, recentTimestamps);

    return false;
};

// Netlify sets x-nf-client-connection-ip itself; the left-most x-forwarded-for entry is client-controlled
const getClientIdentifier = (req: Request) => {
    const forwardedFor = req.headers.get('x-forwarded-for');

    return req.headers.get('x-nf-client-connection-ip')
        || req.headers.get('x-real-ip')
        || forwardedFor?.split(',').pop()?.trim()
        || 'unknown';
};

export async function GET(req: Request, { params }: Params) {
    logRequest(req);

    const { path } = await params;
    const apiPath = path.join('/');

    if (!isAllowedPath(apiPath)) {
        return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }

    const reqUrl = new URL(req.url);

    if (!hasAllowedQuery(reqUrl.searchParams)) {
        return NextResponse.json({ message: 'Bad request' }, { status: 400 });
    }

    if (isRateLimited(getClientIdentifier(req))) {
        return NextResponse.json({ message: 'Too many requests' }, { status: 429 });
    }

    const url = new URL(`${ PARAMETERS.API_URL }/${ apiPath }`);

    reqUrl.searchParams.forEach((value, key) => {
        url.searchParams.set(key, value);
    });

    url.searchParams.set('api_key', PARAMETERS.API_KEY);

    const revalidate = getRevalidate(apiPath);

    try {
        const response = await fetch(url, {
            signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
            next: { revalidate }
        });
        const body = await response.text();

        return new NextResponse(body, {
            status: response.status,
            headers: {
                'Content-Type': response.headers.get('content-type') ?? 'application/json',
                'Cache-Control': response.ok && revalidate > 0
                    ? `public, max-age=60, s-maxage=${ revalidate }, stale-while-revalidate=${ revalidate }`
                    : 'no-store'
            }
        });
    } catch (error) {
        const isTimeout = error instanceof DOMException && error.name === 'TimeoutError';

        return NextResponse.json(
            { message: isTimeout ? 'Gateway timeout' : 'Bad gateway' },
            { status: isTimeout ? 504 : 502 }
        );
    }
}
