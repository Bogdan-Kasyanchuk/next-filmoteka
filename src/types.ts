import { MediaType, VideoType } from './enums';

type SpokenLanguage = {
    english_name: string,
    name: string
};

type ProductionCompany = {
    logo_path: string,
    name: string,
    origin_country?: string
};

export type MovieMapper = {
    id: number,
    title: string,
    poster_path: string,
    media_type: MediaType.MOVIE,
    vote_average: number,
};

export type SimilarMovieMapper = MovieMapper;

export type RecomendationMovieMapper = MovieMapper;

export type MovieDetailsMapper = {
    imdb_id: string,
    adult: boolean,
    homepage: string,
    budget: number,
    title: string,
    overview: string,
    status: string,
    tagline: string,
    vote_average: number,
    vote_count: number,
    popularity: number,
    poster_path: string,
    original_language: string,
    release_date: string,
    revenue: number,
    genres: string[],
    origin_country: string[],
    production_companies: ProductionCompany[],
    spoken_languages: SpokenLanguage[],
}

export type TVMapper = {
    id: number,
    name: string,
    poster_path: string,
    media_type: MediaType.TV,
    vote_average: number,
};

export type SimilarTVMapper = TVMapper;

export type RecomendationTVMapper = TVMapper;

export type TVDetailsMapper = {
    adult: boolean,
    homepage: string,
    first_air_date: string,
    last_air_date: string,
    in_production: boolean,
    name: string,
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
    production_companies: ProductionCompany[],
    spoken_languages: SpokenLanguage[],
    created_by: Array<{
        name: string,
        gender: 1 | 2,
        profile_path: string
    }>,
    seasons: Array<{
        air_date: string,
        episode_count: number,
        name: string,
        overview: string,
        poster_path: string,
        season_number: number,
        vote_average: number
    }>,
    networks: Array<{
        logo_path: string,
        name: string,
        origin_country: string
    }>
}

export type CastMapper = {
    gender: 1 | 2,
    name: string,
    popularity: number,
    profile_path: string,
    character: string,
};

export type CrewMapper = {
    gender: 1 | 2,
    name: string,
    popularity: number,
    profile_path: string,
    department: string,
    job: string,
};

export type ReviewMapper = {
    author: {
        name: string,
        username: string,
        avatar_path: string,
        rating: number
    },
    content: string,
    created_at: string,
    updated_at: string,
};

export type VideoMapper = {
    iso_3166_1: string,
    name: string,
    key: string,
    site: string,
    size: number,
    type: VideoType,
    official: boolean,
    published_at: string,
};

