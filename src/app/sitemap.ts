import { MetadataRoute } from 'next';

import { URLS } from '@/datasets/constants';
import { MovieType, TVShowType } from '@/enums';
import { 
    pagesMovieUrl,
    pagesMoviesUrl,
    pagesPersonUrl,
    pagesPersonsUrl,
    pagesTVShowUrl,
    pagesTVShowsUrl,
    pagesTrendingDayUrl,
    pagesTrendingWeekUrl
} from '@/routes';
import { getMovies, getPersons, getTVShows } from '@/services/api';

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const movies = await getMovies(MovieType.POPULAR, 1);
    const tvshows = await getTVShows(TVShowType.POPULAR, 1);
    const persons = await getPersons(1);

    const staticPages: MetadataRoute.Sitemap = [
        {
            url: URLS.SITE,
            changeFrequency: 'daily',
            priority: 1
        },
        {
            url: `${ URLS.SITE }${ pagesTrendingDayUrl() }`,
            changeFrequency: 'daily',
            priority: 0.9
        },
        {
            url: `${ URLS.SITE }${ pagesTrendingWeekUrl() }`,
            changeFrequency: 'daily',
            priority: 0.9
        },
        {
            url: `${ URLS.SITE }${ pagesMoviesUrl() }`,
            changeFrequency: 'daily',
            priority: 0.85
        },
        {
            url: `${ URLS.SITE }${ pagesTVShowsUrl() }`,
            changeFrequency: 'daily',
            priority: 0.85
        },
        {
            url: `${ URLS.SITE }${ pagesPersonsUrl() }`,
            changeFrequency: 'weekly',
            priority: 0.8
        }
    ];

    const moviePages = movies.results.map(movie => ({
        url: `${ URLS.SITE }${ pagesMovieUrl(movie.id.toString()) }`,
        lastModified: movie.release_date ? new Date(movie.release_date) : undefined,
        changeFrequency: 'weekly',
        priority: 0.7
    })) as MetadataRoute.Sitemap;

    const tvshowPages = tvshows.results.map(tvshow => ({
        url: `${ URLS.SITE }${ pagesTVShowUrl(tvshow.id.toString()) }`,
        lastModified: tvshow.first_air_date ? new Date(tvshow.first_air_date) : undefined,
        changeFrequency: 'weekly',
        priority: 0.7
    })) as MetadataRoute.Sitemap;

    const personPages = persons.results.map(person => ({
        url: `${ URLS.SITE }${ pagesPersonUrl(person.id.toString()) }`,
        changeFrequency: 'monthly',
        priority: 0.6
    })) as MetadataRoute.Sitemap;

    return [
        ...staticPages,
        ...moviePages,
        ...tvshowPages,
        ...personPages
    ];
}
