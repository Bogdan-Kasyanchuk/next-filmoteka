import { MediaType, MovieType, TVShowType, TimeType } from '@/enums';
import { Adult } from '@/types';

export const generalQueryKeys = {
    recommendations: (type: MediaType, id: string, locale: string) => [ 'recommendations', type, id, locale ],
    videos: (type: MediaType, id: string, locale: string) => [ 'videos', type, id, locale ],
    reviews: (type: MediaType, id: string, locale: string) => [ 'reviews', type, id, locale ],
    company: (id: string, locale: string) => [ 'company', id, locale ],
    network: (id: string, locale: string) => [ 'network', id, locale ],
    search: ( type: 'multi' | MediaType, adult: Adult, query: string, page: number, locale: string) => [ 'search', type, adult, query, page, locale ]
};

export const homeQueryKeys = {
    trendingsDay: (locale: string) => [ 'trendings', 'all', TimeType.DAY, locale ],
    trendingsWeek: (locale: string) => [ 'trendings', 'all', TimeType.WEEK, locale ]
};

export const moviesQueryKeys = {
    allMovies: (type: MovieType, page: number, locale: string) => [ 'movies', type, page, locale ],
    movieById: (id: string, locale: string) => [ 'movies', id, locale ],
    currentMovieById: (id: string, locale: string) => [ 'movies', 'current', id, locale ],
    similarMovies: (id: string, page: number, locale: string) => [ 'movies', id, 'similar', page, locale ]
};

export const personsQueryKeys = {
    allPersons: (page: number, locale: string) => [ 'persons', page, locale ],
    personById: (id: string, locale: string) => [ 'persons', id, locale ]
};

export const trendingsQueryKeys = {
    trendingsDay: (type: 'all' | MediaType, page: number, locale: string) => [ 'trendings', type, TimeType.DAY, page, locale ],
    trendingsWeek: (type: 'all' | MediaType, page: number, locale: string) => [ 'trendings', type, TimeType.WEEK, page, locale ]
};

export const tvShowsQueryKeys = {
    alltvShows: (type: TVShowType, page: number, locale: string) => [ 'tv-shows', type, page, locale ],
    tvShowById: (id: string, locale: string) => [ 'tv-shows', id, locale ],
    currentTvShowById: (id: string, locale: string) => [ 'tv-shows', 'current', id, locale ],
    similartvShows: (id: string, page: number, locale: string) => [ 'tv-shows', id, 'similar', page, locale ],
    seasonById: (id: string, season: number, locale: string) => [ 'tv-shows', id, season, locale ]
};