const ID = '[1-9]\\d*';

const HOUR = 3600;
const DAY = 86400;

// revalidate: seconds the response is cached for; 0 disables caching (unbounded keys like search queries)
const ALLOWED_PATHS = [
    { pattern: new RegExp('^movie\\/(now_playing|popular|top_rated|upcoming)$'), revalidate: HOUR },
    { pattern: new RegExp(`^movie\\/${ ID }$`), revalidate: DAY },
    { pattern: new RegExp(`^movie\\/${ ID }\\/(similar|recommendations|reviews)$`), revalidate: DAY },
    { pattern: new RegExp('^tv\\/(airing_today|on_the_air|popular|top_rated)$'), revalidate: HOUR },
    { pattern: new RegExp(`^tv\\/${ ID }$`), revalidate: DAY },
    { pattern: new RegExp(`^tv\\/${ ID }\\/(similar|recommendations|reviews)$`), revalidate: DAY },
    { pattern: new RegExp(`^tv\\/${ ID }\\/season\\/(0|${ ID })$`), revalidate: DAY },
    { pattern: new RegExp('^person\\/popular$'), revalidate: HOUR },
    { pattern: new RegExp(`^person\\/${ ID }$`), revalidate: DAY },
    { pattern: new RegExp('^trending\\/(all|movie|tv|person)\\/(day|week)$'), revalidate: HOUR },
    { pattern: new RegExp('^search\\/(multi|movie|tv|person)$'), revalidate: 0 },
    { pattern: new RegExp(`^network\\/${ ID }$`), revalidate: DAY },
    { pattern: new RegExp(`^company\\/${ ID }$`), revalidate: DAY }
];

const findAllowedPath = (path: string) => ALLOWED_PATHS.find(allowedPath => allowedPath.pattern.test(path));

export const isAllowedPath = (path: string) => findAllowedPath(path) !== undefined;

export const getRevalidate = (path: string) => findAllowedPath(path)?.revalidate ?? 0;
