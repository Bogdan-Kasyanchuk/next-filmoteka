// Temporary diagnostics for Netlify traffic: enable with LOG_REQUESTS=true, read in Netlify's
// Edge Functions (pages) and Functions (/api/tmdb) logs, then remove
export default (request: Request) => {
    if (process.env.LOG_REQUESTS !== 'true') {
        return;
    }

    const { pathname, search } = new URL(request.url);

    // eslint-disable-next-line no-console -- the log line is the whole point of this helper
    console.log(JSON.stringify({
        path: pathname + search,
        ua: request.headers.get('user-agent'),
        ip: request.headers.get('x-nf-client-connection-ip') ?? request.headers.get('x-forwarded-for'),
        referer: request.headers.get('referer'),
        // client-side navigation / hover prefetch instead of a full page load
        rsc: request.headers.has('rsc'),
        prefetch: request.headers.has('next-router-prefetch')
    }));
};
