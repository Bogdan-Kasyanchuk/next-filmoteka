import { NextResponse } from 'next/server';

import { PARAMETERS } from '@/helpers/parameters';

type Params = {
    params: Promise<{ path: string[] }>
};

export async function GET(req: Request, { params }: Params) {
    const { path } = await params;
        
    const url = new URL(req.url);

    url.searchParams.append('language', PARAMETERS.LOCALE);

    const search = url.searchParams.toString();
    
    const targetUrl = `${ PARAMETERS.API_URL }/${ path.join('/') }?${ search }`;

    const response = await fetch(targetUrl, {
        headers: {
            'Authorization': `Bearer ${ PARAMETERS.API_TOKEN }`,
            'Content-Type': 'application/json'
        },
        cache: 'no-store'
    });

    if (!response.ok) {
        const error = await response.json();
            
        return NextResponse.json(
            { message: error?.status_message || 'Internal Server Error' },
            { status: response.status }
        );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
}
