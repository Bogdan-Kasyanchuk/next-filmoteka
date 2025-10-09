export default (pathname: string, params: URLSearchParams) => {
    const page = params.get('page');
    const query = params.get('query');

    params.delete('page');
    params.delete('query');

    if (query) {
        params.set('query', query);
    }

    if (page) {
        params.set('page', page);
    }

    return `${ pathname }?${ params.toString() }`;
};