import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from '@/services/i18n/routing';
 
export default async function proxy(request: NextRequest) {
    const handleI18nRouting = createMiddleware(routing);

    const response = handleI18nRouting(request);

    return response;
}
 
export const config = {
    matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};