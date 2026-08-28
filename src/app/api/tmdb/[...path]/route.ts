import { NextResponse } from 'next/server';

import { PARAMETERS } from '@/datasets/constants';

type Params = {
    params: Promise<{ path: string[] }>
};

const ALLOWED_PATH_PATTERNS = [
    /^movie\/(now_playing|popular|top_rated|upcoming)$/,
    /^movie\/\d+$/,
    /^movie\/\d+\/(similar|recommendations|reviews|videos)$/,
    /^tv\/(airing_today|on_the_air|popular|top_rated)$/,
    /^tv\/\d+$/,
    /^tv\/\d+\/(similar|recommendations|reviews|videos)$/,
    /^tv\/\d+\/season\/\d+$/,
    /^person\/popular$/,
    /^person\/\d+$/,
    /^trending\/(all|movie|tv|person)\/(day|week)$/,
    /^search\/(multi|movie|tv|person)$/,
    /^network\/\d+$/,
    /^company\/\d+$/
];

const isAllowedPath = (apiPath: string) => ALLOWED_PATH_PATTERNS.some(pattern => pattern.test(apiPath));

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 60;

const requestTimestampsByIp = new Map<string, number[]>();

const isRateLimited = (identifier: string) => {
    const now = Date.now();
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

const getClientIdentifier = (req: Request) => {
    const forwardedFor = req.headers.get('x-forwarded-for');

    return forwardedFor?.split(',')[ 0 ]?.trim()
        || req.headers.get('x-real-ip')
        || 'unknown';
};

export async function GET(req: Request, { params }: Params) {
    const { path } = await params;
    const apiPath = path.join('/');

    if (!isAllowedPath(apiPath)) {
        return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }

    if (isRateLimited(getClientIdentifier(req))) {
        return NextResponse.json({ message: 'Too many requests' }, { status: 429 });
    }

    const url = new URL(`${ PARAMETERS.API_URL }/${ apiPath }`);

    url.searchParams.append('api_key', PARAMETERS.API_KEY);

    const reqUrl = new URL(req.url);

    reqUrl.searchParams.forEach((value, key) => {
        url.searchParams.append(key, value);
    });

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
}
