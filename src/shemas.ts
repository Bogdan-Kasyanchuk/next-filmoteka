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
    media_type: string,
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
    media_type: string,
    popularity: number,
    first_air_date: string,
    vote_average: number,
    vote_count: number,
    genre_ids: number[],
    origin_country: string[],
};

export type CreditsShema = {
    id: number,
    cast: CastShema[],
    crew: CrewShema[]
};

export type CastShema = {
    adult: boolean,
    gender: number,
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
    gender: number,
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
    type: string,
    official: boolean,
    published_at: string,
    id: string
};

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
}

export type TVDetailsShema = {
    adult: boolean,
    backdrop_path: string,
    created_by: Array<{
        id: number,
        credit_id: string,
        name: string,
        original_name: string,
        gender: number,
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
    seasons: Array<{
        air_date: string,
        episode_count: number,
        id: number,
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
    }>,
    status: string,
    tagline: string,
    type: string,
    vote_average: number,
    vote_count: number
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export type SimilarShema = {
    'adult': false,
    'backdrop_path': '/i3oT0v1KVDZEq8oOZdAAqy78Vub.jpg',
    'genre_ids': [
        14,
        35,
        10749,
        878
    ],
    'id': 12107,
    'original_language': 'en',
    'original_title': 'Nutty Professor II: The Klumps',
    'overview': 'The hilarity begins when professor Sherman Klump finds romance with fellow DNA specialist, Denise Gaines, and discovers a brilliant formula that reverses aging. But Sherman\'s thin and obnoxious alter ego, Buddy Love, wants out...and a big piece of the action. And when Buddy gets loose, things get seriously nutty.',
    'popularity': 2.0471,
    'poster_path': '/7HlhufckAoQb1yIu3FNu339Iuv4.jpg',
    'release_date': '2000-07-27',
    'title': 'Nutty Professor II: The Klumps',
    'video': false,
    'vote_average': 5.004,
    'vote_count': 1331
};

export type RecomendationShema = {
    'backdrop_path': '/fuL0NvVCG7YYjhxkosh8pS0J1nm.jpg',
    'id': 1086497,
    'title': 'The Penguin Lessons',
    'original_title': 'The Penguin Lessons',
    'overview': 'In 1976, as Argentina descends into violence and chaos, a world-weary English teacher regains his compassion for others thanks to an unlikely friendship with a penguin.',
    'poster_path': '/hZ7rDX01j86x8O1E7Pe7658QYs4.jpg',
    'media_type': 'movie',
    'adult': false,
    'original_language': 'en',
    'genre_ids': [
        18
    ],
    'popularity': 19.7717,
    'release_date': '2025-03-27',
    'video': false,
    'vote_average': 7.167,
    'vote_count': 27
};

