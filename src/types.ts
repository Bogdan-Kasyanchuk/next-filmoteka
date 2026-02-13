import { EpisodeType, MediaType, VideoType } from './enums';

type SpokenLanguage = {
    english_name: string,
    name: string
};

type Company = {
    id: string,
    logo_path: string,
    name: string,
    origin_country: string
};

type Network = {
    id: string,
    logo_path: string,
    name: string,
    origin_country: string
};

type Creator = {
    id: string,
    name: string,
    profile_path: string
};

export type CompanyDetailsMapper = {
    description: string,
    headquarters: string,
    homepage: string,
    parent_company: string | null
};

export type NetworkDetailsMapper = {
    headquarters: string,
    homepage: string
};

export type CastMapper = {
    id: string,
    name: string,
    popularity: number,
    profile_path: string,
    character: string
};

export type CrewMapper = {
    id: string,
    name: string,
    popularity: number,
    profile_path: string,
    job: string
};

export type ReviewMapper = {
    author: {
        name: string,
        username: string,
        avatar_path: string,
        rating: number
    },
    content: string,
    created_at: Date | null,
    updated_at: Date | null
};

export type VideoMapper = {
    name: string,
    key: string,
    type: VideoType,
    published_at: string
};

export type EpisodeMapper = {
    air_date: Date | null,
    episode_number: number,
    episode_type: EpisodeType,
    name: string,
    overview: string,
    runtime: number,
    still_path: string,
    vote_average: number,
    vote_count: number
};

export type SeasonMapper = {
    air_date: Date | null,
    episode_count: number,
    name: string,
    poster_path: string,
    season_number: number,
    vote_average: number
};

export type ImageMapper = {
    height: number,
    width: number,
    file_path: string,
    vote_average: number,
    vote_count: number
};

export type SocialLinkMapper = {
    provider: string,
    link: string
};

export type MovieMapper = {
    id: string,
    adult: boolean,
    release_date: Date | null,
    title: string,
    poster_path: string,
    media_type: MediaType.MOVIE,
    vote_average: number
};

export type MovieDetailsMapper = {
    movie: {
        adult: boolean,
        homepage: string,
        budget: number,
        title: string,
        overview: string,
        tagline: string,
        vote_average: number,
        vote_count: number,
        popularity: number,
        backdrop_path: string,
        poster_path: string,
        original_language: string,
        release_date: Date | null,
        revenue: number,
        runtime: number,
        genres: string[],
        origin_country: string[],
        production_companies: Company[],
        spoken_languages: SpokenLanguage[],
        socialLinks: SocialLinkMapper[]
    },
    cast: CastMapper[],
    crew: CrewMapper[]
};

export type CurrentMovieMapper = {
    adult: boolean,
    title: string,
    vote_average: number,
    poster_path: string,
    release_date: Date | null,
    genres: string[]
};

export type TVShowMapper = {
    id: string,
    adult: boolean,
    first_air_date: Date | null,
    name: string,
    poster_path: string,
    media_type: MediaType.TV_SHOW,
    vote_average: number
};

export type TVShowDetailsMapper = {
    tvShow: {
        adult: boolean,
        homepage: string,
        first_air_date: Date | null,
        last_air_date: Date | null,
        name: string,
        number_of_episodes: number,
        number_of_seasons: number,
        original_language: string,
        overview: string,
        tagline: string,
        type: string,
        vote_average: number,
        vote_count: number,
        popularity: number,
        backdrop_path: string,
        poster_path: string,
        genres: string[],
        origin_country: string[],
        production_companies: Company[],
        spoken_languages: SpokenLanguage[],
        created_by: Creator[],
        networks: Network[],
        socialLinks: SocialLinkMapper[]
    },
    seasons: SeasonMapper[],
    cast: CastMapper[],
    crew: CrewMapper[]
};

export type CurrentTVShowMapper = {
    adult: boolean,
    first_air_date: Date | null,
    name: string,
    vote_average: number,
    poster_path: string,
    genres: string[]
};

export type TVShowSeasonDetailsMapper = {
    season: {
        air_date: Date | null,
        name: string,
        overview: string,
        poster_path: string,
        season_number: number,
        vote_average: number
    },
    episodes: EpisodeMapper[]
};

export type MediaCastMapper = {
    id: string,
    title: string,
    poster_path: string,
    release_date: Date | null,
    character: string,
    media_type: string
};

export type MediaCrewMapper = {
    id: string,
    title: string,
    poster_path: string,
    release_date: Date | null,
    job: string,
    media_type: string
};

export type PersonMapper = {
    adult: boolean,
    id: string,
    known_for_department: string,
    name: string,
    media_type: MediaType.PERSON,
    popularity: number,
    profile_path: string
};

export type PersonDetailsMapper = {
    person: {
        adult: boolean,
        also_known_as: string[],
        biography: string,
        birthday: Date | null,
        deathday: Date | null,
        homepage: string,
        known_for_department: string,
        name: string,
        place_of_birth: string,
        popularity: number,
        profile_path: string,
        socialLinks: SocialLinkMapper[]
    },
    images: ImageMapper[],
    cast: MediaCastMapper[],
    crew: MediaCrewMapper[]
};

export type Adult = 'true' | 'false';