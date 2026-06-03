export default (path: string, params: URLSearchParams) => {
    const query = params.get('query');

    const newSearchParams = new URLSearchParams();

    params.forEach((value, key) => {
        if (key !== 'query') {
            newSearchParams.append(key, value);
        }
    });

    if (query) {
        newSearchParams.set('query', query);
    }

    const searchParams = newSearchParams.toString();

    return (searchParams ? `${ path }?${ searchParams }` : path).replace('//', '/');
};