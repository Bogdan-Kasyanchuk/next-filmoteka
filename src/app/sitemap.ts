import { MetadataRoute } from 'next';

import { MovieType, TVShowType } from '@/enums';
import { PARAMETERS } from '@/helpers/parameters';
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
    const movies = await getMovies(MovieType.NOW_PLAYING, 1);
    const tvshows = await getTVShows(TVShowType.ON_THE_AIR, 1);
    const persons = await getPersons(1);

    const staticPages: MetadataRoute.Sitemap = [
        {
            url: PARAMETERS.SITE_URL,
            changeFrequency: 'daily',
            priority: 1
        },
        {
            url: `${ PARAMETERS.SITE_URL }${ pagesTrendingDayUrl() }`,
            changeFrequency: 'daily',
            priority: 0.9
        },
        {
            url: `${ PARAMETERS.SITE_URL }${ pagesTrendingWeekUrl() }`,
            changeFrequency: 'daily',
            priority: 0.9
        },
        {
            url: `${ PARAMETERS.SITE_URL }${ pagesMoviesUrl() }`,
            changeFrequency: 'daily',
            priority: 0.85
        },
        {
            url: `${ PARAMETERS.SITE_URL }${ pagesTVShowsUrl() }`,
            changeFrequency: 'daily',
            priority: 0.85
        },
        {
            url: `${ PARAMETERS.SITE_URL }${ pagesPersonsUrl() }`,
            changeFrequency: 'weekly',
            priority: 0.8
        }
    ];

    const moviePages = movies.results.map(movie => ({
        url: `${ PARAMETERS.SITE_URL }${ pagesMovieUrl(movie.id.toString()) }`,
        lastModified: movie.release_date ? new Date(movie.release_date) : undefined,
        changeFrequency: 'weekly',
        priority: 0.7
    })) as MetadataRoute.Sitemap;

    const tvshowPages = tvshows.results.map(tvshow => ({
        url: `${ PARAMETERS.SITE_URL }${ pagesTVShowUrl(tvshow.id.toString()) }`,
        lastModified: tvshow.first_air_date ? new Date(tvshow.first_air_date) : undefined,
        changeFrequency: 'weekly',
        priority: 0.7
    })) as MetadataRoute.Sitemap;

    const personPages = persons.results.map(person => ({
        url: `${ PARAMETERS.SITE_URL }${ pagesPersonUrl(person.id.toString()) }`,
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
