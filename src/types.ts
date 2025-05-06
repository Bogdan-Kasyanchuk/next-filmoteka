import { MediaType } from './enums';

export type MediaShema<Type> = {
    page: number,
    results: Type[],
    total_pages: number,
    total_results: number,
};

export type MovieShema = {
    adult: boolean,
    backdrop_path: string,
    id: number,
    title: string,
    original_language: string,
    original_title: string,
    overview: string,
    poster_path: string,
    media_type: MediaType.MOVIE,
    popularity: number,
    release_date: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    genre_ids: number[],
};

export type TVShema = {
    adult: boolean,
    backdrop_path: string,
    id: number,
    name: string,
    original_language: string,
    original_name: string,
    overview: string,
    poster_path: string,
    media_type: MediaType.TV,
    popularity: number,
    first_air_date: string,
    vote_average: number,
    vote_count: number,
    genre_ids: number[],
    origin_country: string[],
};

export type MovieMapper = {
    id: number,
    title: string,
    original_title: string,
    poster_path: string,
    media_type: MediaType.MOVIE,
    vote_average: number,
};

export type TVMapper = {
    id: number,
    name: string,
    original_name: string,
    poster_path: string,
    media_type: MediaType.TV,
    vote_average: number,
};

export type MovieDetailsMapper = {
    imdb_id: string,
    adult: boolean,
    homepage: string,
    budget: number,
    title: string,
    original_title: string,
    overview: string,
    status: string,
    tagline: string,
    vote_average: number,
    vote_count: number
    popularity: number,
    poster_path: string,
    original_language: string,
    release_date: string,
    revenue: number,
    genres: string[],
    origin_country: string[],
    production_companies: Array<{
        logo_path: string,
        name: string,
        origin_country: string
    }>,
    production_countries: Array<{
        iso_3166_1: string,
        name: string
    }>,
    spoken_languages: Array<{
        english_name: string,
        iso_639_1: string,
        name: string
    }>,

}

export type TVDetailsMapper = {
    adult: boolean,
    homepage: string,
    first_air_date: string,
    last_air_date: string,
    in_production: boolean,
    name: string,
    original_name: string,
    number_of_episodes: number,
    number_of_seasons: number,
    original_language: string,
    overview: string,
    status: string,
    tagline: string,
    type: string,
    vote_average: number,
    vote_count: number
    popularity: number,
    poster_path: string,
    languages: string[],
    genres: string[],
    origin_country: string[],
    created_by: Array<{
        name: string,
        original_name: string,
        gender: number,
        profile_path: string
    }>,
    production_companies: Array<{
        logo_path: string,
        name: string,
        origin_country: string
    }>,
    production_countries: Array<{
        iso_3166_1: string,
        name: string
    }>,
    seasons: Array<{
        id: number,
        air_date: string,
        episode_count: number,
        name: string,
        overview: string,
        poster_path: string,
        season_number: number,
        vote_average: number
    }>,
    spoken_languages: Array<{
        english_name: string,
        iso_639_1: string,
        name: string
    }>
}