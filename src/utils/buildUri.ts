export default (pathname: string, params: URLSearchParams) => {
    const query = params.get('query');
    const page = params.get('page');

    const newParams = new URLSearchParams();

    params.forEach((value, key) => {
        if (key !== 'query' && key !== 'page') {
            newParams.append(key, value);
        }
    });

    if (query) {
        newParams.set('query', query);
    }

    if (page) {
        newParams.set('page', page);
    }

    const qs = newParams.toString();

    return qs ? `${ pathname }?${ qs }` : pathname;
};