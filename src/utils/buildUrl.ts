export default (pathname: string, params: URLSearchParams) => {
    const query = params.get('query');

    const newParams = new URLSearchParams();

    params.forEach((value, key) => {
        if (key !== 'query') {
            newParams.append(key, value);
        }
    });

    if (query) {
        newParams.set('query', query);
    }

    const sp = newParams.toString();

    return sp ? `${ pathname }?${ sp }` : pathname;
};