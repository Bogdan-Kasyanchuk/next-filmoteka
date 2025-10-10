export default (pathname: string, params: URLSearchParams) => {
    const query = params.get('query');
    const page = params.get('page');

    params.delete('query');
    params.delete('page');

    if (query) {
        params.set('query', query);
    }

    if (page) {
        params.set('page', page);
    }

    return `${ pathname }?${ params.toString() }`;
};