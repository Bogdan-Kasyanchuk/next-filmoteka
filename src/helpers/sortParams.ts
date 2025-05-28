export const sortParams = (pathname: string, params: URLSearchParams) => {
    params.sort();

    return `${pathname}?${params.toString().split('&').reverse().join('&')}`;
};