import { NextResponse } from 'next/server';
import { getLocale } from 'next-intl/server';

import { PARAMETERS } from '@/helpers/parameters';

type Params = {
    params: Promise<{ path: string[] }>
};

export async function GET(req: Request, { params }: Params) {
    const locale = await getLocale() as keyof typeof PARAMETERS.LOCALE;

    const { path } = await params;

    const apiPath = path.join('/');

    const url = new URL(`${ PARAMETERS.API_URL }/${ apiPath }`);

    url.searchParams.append('api_key', PARAMETERS.API_KEY);
    url.searchParams.append('language', PARAMETERS.LOCALE[ locale ]);

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