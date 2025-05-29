import { EpisodeType, GenderType, MediaType, VideoType } from './enums';

type SpokenLanguage = {
    english_name: string,
    name: string
};

type ProductionCompany = {
    logo_path: string,
    name: string,
    origin_country?: string
};

type SeasonMapper = {
    air_date: string,
    episode_count: number,
    name: string,
    overview: string,
    poster_path: string,
    season_number: number,
    vote_average: number
};

type Network = {
    logo_path: string,
    name: string,
    origin_country: string
};

type Creator = {
    name: string,
    profile_path: string
};

export type MovieMapper = {
    id: number,
    adult: boolean,
    title: string,
    poster_path: string,
    media_type: MediaType.MOVIE,
    vote_average: number,
};

export type SimilarMovieMapper = MovieMapper;

export type RecommendationMovieMapper = MovieMapper;

export type MovieDetailsMapper = {
    movie: {
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
        backdrop_path: string,
        poster_path: string,
        original_language: string,
        release_date: string,
        revenue: number,
        runtime: number,
        genres: string[],
        origin_country: string[],
        production_companies: ProductionCompany[],
        spoken_languages: SpokenLanguage[],
    },
    cast: CastMapper[],
    videos: VideoMapper[],
    reviews: ReviewMapper[],
    recommendations: RecommendationMovieMapper[],
}

export type TVShowMapper = {
    id: number,
    adult: boolean,
    name: string,
    poster_path: string,
    media_type: MediaType.TV_SHOW,
    vote_average: number,
};

export type SimilarTVShowMapper = TVShowMapper;

export type RecommendationTVShowMapper = TVShowMapper;

export type TVShowDetailsMapper = {
    tvShow: {
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
        backdrop_path: string,
        poster_path: string,
        genres: string[],
        origin_country: string[],
        production_companies: ProductionCompany[],
        spoken_languages: SpokenLanguage[],
        created_by: Creator[],
        networks: Network[],
    },
    seasons: SeasonMapper[],
    cast: CastMapper[],
    videos: VideoMapper[],
    reviews: ReviewMapper[],
    recommendations: RecommendationTVShowMapper[],
}

export type TVShowSeasonDetailsMapper = {
    _id: string,
    air_date: string,
    name: string,
    overview: string,
    id: number,
    poster_path: string,
    season_number: number,
    vote_average: number,
    episodes: Array<{
        air_date: string,
        episode_number: number,
        episode_type: EpisodeType,
        id: number,
        name: string,
        overview: string,
        production_code: string,
        runtime: number,
        season_number: number,
        // show_id: number,
        still_path: string,
        vote_average: number,
        // vote_count: number,
        // crew: CrewShema[],
        // guest_stars: Omit<CastShema, 'cast_id'>[]
    }>
}

export type CastMapper = {
    name: string,
    popularity: number,
    profile_path: string,
    character: string,
};

export type CrewMapper = {
    gender: GenderType,
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

