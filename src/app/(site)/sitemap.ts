import { MetadataRoute } from 'next';
import { getLocale } from 'next-intl/server';

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
import { getMovies } from '@/services/tmdb/movies';
import { getPersons } from '@/services/tmdb/persons';
import { getTVShows } from '@/services/tmdb/tvShows';
import normalizeId from '@/utils/normalizeId';

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const locale = await getLocale();
    
    const movies = await getMovies(MovieType.POPULAR, 1, locale);
    const tvshows = await getTVShows(TVShowType.POPULAR, 1, locale);
    const persons = await getPersons(1, locale);

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
        url: `${ URLS.SITE }${ pagesMovieUrl(normalizeId(movie.id)) }`,
        lastModified: movie.release_date ? new Date(movie.release_date) : undefined,
        changeFrequency: 'weekly',
        priority: 0.7
    })) as MetadataRoute.Sitemap;

    const tvshowPages = tvshows.results.map(tvshow => ({
        url: `${ URLS.SITE }${ pagesTVShowUrl(normalizeId(tvshow.id)) }`,
        lastModified: tvshow.first_air_date ? new Date(tvshow.first_air_date) : undefined,
        changeFrequency: 'weekly',
        priority: 0.7
    })) as MetadataRoute.Sitemap;

    const personPages = persons.results.map(person => ({
        url: `${ URLS.SITE }${ pagesPersonUrl(normalizeId(person.id)) }`,
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
