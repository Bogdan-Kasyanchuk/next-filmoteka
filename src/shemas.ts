import { EpisodeType, GenderType, MediaType, VideoType } from './enums';

export type NetworkShema = {
    id: number,
    logo_path: string,
    name: string,
    origin_country: string
};

export type CreatedShema = {
    id: number,
    credit_id: string,
    name: string,
    original_name: string,
    gender: GenderType,
    profile_path: string
};

export type GenreShema = {
    id: number,
    name: string
};

export type CollectionShema = {
    id: number,
    name: string,
    poster_path: string,
    backdrop_path: string
};

export type ProductionCompanyShema = {
    id: number,
    logo_path: string,
    name: string,
    origin_country: string
};

export type ProductionCountryShema = {
    iso_3166_1: string,
    name: string
};

export type SpokenLanguageShema = {
    english_name: string,
    iso_639_1: string,
    name: string
};

export type ImageShema = {
    aspect_ratio: number,
    height: number,
    width: number,
    iso_639_1: string,
    file_path: string,
    vote_average: number,
    vote_count: number
};

export type ExternalIdShema = {
    id: number,
    imdb_id: string,
    wikidata_id: string,
    facebook_id: string,
    instagram_id: string,
    twitter_id: string
};

export type DataShema<Type> = {
    dates?: {
        maximum: string,
        minimum: string
    },
    page: number,
    results: Type[],
    total_pages: number,
    total_results: number
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
    genre_ids: number[]
};

export type SimilarMovieShema = Omit<MovieShema, 'media_type'>;

export type MovieDetailsShema = {
    adult: boolean,
    backdrop_path: string,
    belongs_to_collection: CollectionShema[],
    budget: number,
    genres: GenreShema[],
    homepage: string,
    id: number,
    imdb_id: string,
    origin_country: string[],
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: ProductionCompanyShema[],
    production_countries: ProductionCountryShema[],
    release_date: string,
    revenue: number,
    runtime: number,
    spoken_languages: SpokenLanguageShema[],
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
    recommendations: DataShema<MovieShema>,
    external_ids: ExternalIdShema
};

export type CurrentMovieShema = Omit<MovieDetailsShema, 'credits' | 'videos' | 'reviews' | 'recommendations'>;

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
    origin_country: string[]
};

export type SimilarTVShowShema = Omit<TVShowShema, 'media_type'>;

export type TVShowDetailsShema = {
    adult: boolean,
    backdrop_path: string,
    created_by: CreatedShema[],
    episode_run_time: number[],
    first_air_date: string,
    genres: GenreShema[],
    homepage: string,
    id: number,
    in_production: boolean,
    languages: string[],
    last_air_date: string,
    last_episode_to_air: Omit<EpisodeShema, 'crew' | 'guest_stars'>[],
    name: string,
    next_episode_to_air: string,
    networks: NetworkShema[],
    number_of_episodes: number,
    number_of_seasons: number,
    origin_country: string[],
    original_language: string,
    original_name: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: ProductionCompanyShema[],
    production_countries: ProductionCountryShema[],
    spoken_languages: SpokenLanguageShema[],
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
    recommendations: DataShema<TVShowShema>,
    external_ids: ExternalIdShema & {
        freebase_mid: string,
        freebase_id: string,
        tvdb_id: number,
        tvrage_id: number
    }
};

export type CurrentTVShowShema = Omit<TVShowDetailsShema, 'seasons' | 'credits' | 'videos' | 'reviews' | 'recommendations'>;

export type TVShowSeasonDetailsShema = {
    _id: string,
    air_date: string,
    name: string,
    overview: string,
    id: number,
    poster_path: string,
    season_number: number,
    vote_average: number,
    episodes: EpisodeShema[]
};

export type EpisodeShema = {
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
};

export type SeasonShema = {
    air_date: string,
    episode_count: number,
    id: number,
    name: string,
    overview: string,
    poster_path: string,
    season_number: number,
    vote_average: number
};

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
};

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
    job: string
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

export type MediaCastShema = {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    original_name: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    name: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    character: string,
    credit_id: string,
    order: number,
    media_type: string
};

export type MediaCrewShema = {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    original_name: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    name: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    credit_id: string,
    department: string,
    job: string,
    media_type: string
};

export type PersonShema = {
    adult: boolean,
    id: number,
    name: string,
    original_name: string,
    media_type: MediaType.PERSON,
    popularity: number,
    gender: GenderType,
    known_for_department: string,
    profile_path: string,
    known_for: Omit<MovieShema, 'popularity'>[]
};

export type PersonDetailsShema = {
    adult: boolean,
    also_known_as: string[],
    biography: string,
    birthday: string,
    deathday: string,
    gender: GenderType,
    homepage: string,
    id: number,
    imdb_id: string,
    known_for_department: string,
    name: string,
    place_of_birth: string,
    popularity: number,
    profile_path: string,
    combined_credits: {
        cast: MediaCastShema[],
        crew: MediaCrewShema[]
    },
    images: {
        profiles: ImageShema[]
    },
    external_ids: ExternalIdShema & {
        freebase_mid: string,
        freebase_id: string,
        tvrage_id: number,
        tiktok_id: string,
        youtube_id: string
    }
};