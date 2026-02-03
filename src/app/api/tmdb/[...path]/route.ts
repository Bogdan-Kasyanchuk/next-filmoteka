import { NextResponse } from 'next/server';

import { PARAMETERS, URLS } from '@/datasets/constants';

type Params = {
    params: Promise<{ path: string[] }>
};

export async function GET(req: Request, { params }: Params) {
    const { path } = await params;
    const apiPath = path.join('/');

    const url = new URL(`${ URLS.API }/${ apiPath }`);

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