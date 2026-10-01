export const NAVIGATION_START_EVENT = 'navigation-progress:start';

export const isTrackedNavigation = (href: string) => {
    const url = new URL(href, window.location.href);

    return url.origin === window.location.origin
        && url.pathname + url.search !== window.location.pathname + window.location.search;
};

export default (href?: string) => {
    if (href && !isTrackedNavigation(href)) {
        return;
    }

    window.dispatchEvent(new Event(NAVIGATION_START_EVENT));
};
