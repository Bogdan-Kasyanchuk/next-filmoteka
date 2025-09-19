import { EpisodeType, GenderType, MediaType, VideoType } from './enums';

export type SpokenLanguage = {
    english_name: string,
    name: string,
};

export type ProductionCompany = {
    logo_path: string,
    name: string,
    origin_country?: string,
};

export type Network = {
    logo_path: string,
    name: string,
    origin_country: string,
};

export type Creator = {
    name: string,
    profile_path: string,
};

export type CastMapper = {
    id: number,
    name: string,
    popularity: number,
    profile_path: string,
    character: string,
};

export type CrewMapper = {
    id: number,
    name: string,
    popularity: number,
    profile_path: string,
    job: string,
};

export type ReviewMapper = {
    author: {
        name: string,
        username: string,
        avatar_path: string,
        rating: number,
    },
    content: string,
    created_at: string,
    updated_at: string,
};

export type VideoMapper = {
    name: string,
    key: string,
    type: VideoType,
    published_at: string,
};

export type EpisodeMapper = {
    air_date: string,
    episode_number: number,
    episode_type: EpisodeType,
    name: string,
    overview: string,
    runtime: number,
    season_number: number,
    still_path: string,
    vote_average: number,
    vote_count: number,
};

export type SeasonMapper = {
    air_date: string,
    episode_count: number,
    name: string,
    poster_path: string,
    season_number: number,
    vote_average: number,
};

export type ImageMapper = {
    height: number,
    width: number,
    file_path: string,
    vote_average: number,
    vote_count: number,
};

export type MovieMapper = {
    id: number,
    adult: boolean,
    title: string,
    poster_path: string,
    media_type: MediaType.MOVIE,
    vote_average: number,
};

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
    crew: CrewMapper[],
    videos: VideoMapper[],
    reviews: {
        items: ReviewMapper[],
        totalPages: number,
    },
    recommendations: {
        items: MovieMapper[],
        totalPages: number,
    },
};

export type CurrentMovieMapper = {
    adult: boolean,
    title: string,
    vote_average: number,
    poster_path: string,
    release_date: string,
    media_type: MediaType.MOVIE,
    genres: string[],
};

export type TVShowMapper = {
    id: number,
    adult: boolean,
    name: string,
    poster_path: string,
    media_type: MediaType.TV_SHOW,
    vote_average: number,
};

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
    crew: CrewMapper[],
    videos: VideoMapper[],
    reviews: {
        items: ReviewMapper[],
        totalPages: number,
    },
    recommendations: {
        items: TVShowMapper[],
        totalPages: number,
    },
};

export type CurrentTVShowMapper = {
    adult: boolean,
    first_air_date: string,
    name: string,
    vote_average: number,
    poster_path: string,
    media_type: MediaType.TV_SHOW,
    genres: string[],
};

export type TVShowSeasonDetailsMapper = {
    season: {
        air_date: string,
        name: string,
        overview: string,
        poster_path: string,
        season_number: number,
        vote_average: number,
    },
    episodes: EpisodeMapper[],
};

export type MediaCastMapper = {
    id: number,
    title: string,
    poster_path: string,
    release_date: string,
    character: string,
    media_type: string,
}

export type MediaCrewMapper = {
    id: number,
    title: string,
    poster_path: string,
    release_date: string,
    job: string,
    media_type: string,
};

export type PersonMapper = {
    adult: boolean,
    gender: GenderType,
    id: number,
    known_for_department: string,
    name: string,
    media_type: MediaType.PERSON,
    popularity: number,
    profile_path: string,
};

export type PersonDetailsMapper = {
    person: {
        adult: boolean,
        also_known_as: string[],
        biography: string,
        birthday: string,
        deathday: string,
        homepage: string,
        imdb_id: string,
        known_for_department: string,
        name: string,
        place_of_birth: string,
        popularity: number,
        profile_path: string,
    },
    cast: MediaCastMapper[],
    crew: MediaCrewMapper[],
};