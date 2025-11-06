import { NextResponse } from 'next/server';

import { getProductionCompanyById } from '@/services/api';

type Params = {
    params: Promise<{ id: string }>
};

export async function GET(req: Request, { params }: Params) {
    const { id } = await params;

    try {
        const data = await getProductionCompanyById(id);

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            error instanceof Error ? error.message : 'Internal server error',
            { status: 500 }
        );
    }
}