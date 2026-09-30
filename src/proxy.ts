import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from '@/services/i18n/routing';
import logRequest from '@/utils/logRequest';

const handleI18nRouting = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
    logRequest(request);

    return handleI18nRouting(request);
}
 
export const config = {
    matcher: '/((?!api|_next|.*\\..*).*)'
};
