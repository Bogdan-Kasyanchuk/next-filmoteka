import { PARAMETERS } from '@/datasets/constants';

export function withBaseUrl<TArgs extends any[]>(fn: (...args: TArgs) => string) {
    return (...args: TArgs) => {
        const baseUrl = PARAMETERS.APP_URL;
        const path = fn(...args);

        return path === '/' ? baseUrl : `${ baseUrl }${ path }`;
    };
}