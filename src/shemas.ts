import { EpisodeType, GenderType, MediaType, VideoType } from './enums';

export type DataShema<Type> = {
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

export type SimilarMovieShema = Omit<MovieShema, 'media_type'>;

export type RecommendationMovieShema = MovieShema;

export type MovieDetailsShema = {
    adult: boolean,
    backdrop_path: string,
    belongs_to_collection: Array<{
        id: number,
        name: string,
        poster_path: string,
        backdrop_path: string
    }>,
    budget: number,
    genres: Array<{
        id: number,
        name: string,
    }>,
    homepage: string,
    id: number,
    imdb_id: string,
    origin_country: string[],
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: Array<{
        id: number,
        logo_path: string,
        name: string,
        origin_country: string
    }>,
    production_countries: Array<{
        iso_3166_1: string,
        name: string
    }>,
    release_date: string,
    revenue: number,
    runtime: number,
    spoken_languages: Array<{
        english_name: string,
        iso_639_1: string,
        name: string
    }>,
    status: string,
    tagline: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    credits: {
        cast: CastShema[],
        crew: CrewShema[]
    },
    videos: {
        results: VideoShema[]
    },
    reviews: DataShema<ReviewShema>,
    recommendations: DataShema<RecommendationMovieShema>,
}

export type TVShowShema = {
    adult: boolean,
    backdrop_path: string,
    id: number,
    name: string,
    original_language: string,
    original_name: string,
    overview: string,
    poster_path: string,
    media_type: MediaType.TV_SHOW,
    popularity: number,
    first_air_date: string,
    vote_average: number,
    vote_count: number,
    genre_ids: number[],
    origin_country: string[],
};

export type SimilarTVShowShema = Omit<TVShowShema, 'media_type'>;

export type RecommendationTVShowShema = TVShowShema

export type TVShowDetailsShema = {
    adult: boolean,
    backdrop_path: string,
    created_by: Array<{
        id: number,
        credit_id: string,
        name: string,
        original_name: string,
        gender: GenderType,
        profile_path: string
    }>,
    episode_run_time: number[],
    first_air_date: string,
    genres: Array<{
        id: number,
        name: string
    }>,
    homepage: string,
    id: number,
    in_production: boolean,
    languages: string[],
    last_air_date: string,
    last_episode_to_air: {
        id: number,
        name: string
        overview: string,
        vote_average: number,
        vote_count: number
        air_date: string,
        episode_number: number,
        episode_type: string,
        production_code: string,
        runtime: number,
        season_number: number,
        show_id: number,
        still_path: string
    },
    name: string
    next_episode_to_air: string,
    networks: Array<{
        id: number,
        logo_path: string,
        name: string,
        origin_country: string
    }>
    number_of_episodes: number,
    number_of_seasons: number,
    origin_country: string[],
    original_language: string,
    original_name: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: Array<{
        id: number,
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
    status: string,
    tagline: string,
    type: string,
    vote_average: number,
    vote_count: number,
    seasons: SeasonShema[],
    credits: {
        cast: CastShema[],
        crew: CrewShema[]
    },
    videos: {
        results: VideoShema[]
    },
    reviews: DataShema<ReviewShema>,
    recommendations: DataShema<RecommendationTVShowShema>,
}

export type TVShowSeasonDetailsShema = {
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
        show_id: number,
        still_path: string,
        vote_average: number,
        vote_count: number,
        crew: CrewShema[],
        guest_stars: Omit<CastShema, 'cast_id'>[]
    }>
}

export type SeasonShema = {
    air_date: string,
    episode_count: number,
    id: number,
    name: string,
    overview: string,
    poster_path: string,
    season_number: number,
    vote_average: number
}

export type CastShema = {
    adult: boolean,
    gender: GenderType,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string,
    cast_id: number,
    character: string,
    credit_id: string,
    order: number
}

export type CrewShema = {
    adult: boolean,
    gender: GenderType,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string,
    credit_id: string,
    department: string,
    job: string,
};

export type ReviewShema = {
    author: string,
    author_details: {
        name: string,
        username: string,
        avatar_path: string,
        rating: number
    },
    content: string,
    created_at: string,
    id: string,
    updated_at: string,
    url: string
};

export type VideoShema = {
    iso_639_1: string,
    iso_3166_1: string,
    name: string,
    key: string,
    site: string,
    size: number,
    type: VideoType,
    official: boolean,
    published_at: string,
    id: string
};

