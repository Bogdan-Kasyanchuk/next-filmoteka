import { MediaType, VideoSiteType, VideoType } from '@/enums';
import {
    CastShema,
    MovieDetailsShema,
    MovieDetailsForSimilarShema,
    MovieShema,
    RecommendationMovieShema,
    RecommendationTVShowShema,
    ReviewShema,
    SeasonShema,
    SimilarMovieShema,
    SimilarTVShowShema,
    TVShowDetailsShema,
    TVShowDetailsForSimilarShema,
    TVShowShema,
    VideoShema,
    TVShowSeasonDetailsShema,
    EpisodeShema
} from '@/shemas';
import {
    CastMapper,
    MovieDetailsMapper,
    MovieDetailsForSimilarMapper,
    MovieMapper,
    RecommendationMovieMapper,
    RecommendationTVShowMapper,
    ReviewMapper,
    SeasonMapper,
    SimilarMovieMapper,
    SimilarTVShowMapper,
    TVShowDetailsMapper,
    TVShowDetailsForSimilarMapper,
    TVShowMapper,
    VideoMapper,
    EpisodeMapper,
    TVShowSeasonDetailsMapper
} from '@/types';

export const transformMovie = (movie: MovieShema) => ({
    id: movie.id,
    adult: movie.adult,
    title: movie.title || movie.original_title,
    poster_path: movie.poster_path,
    media_type: MediaType.MOVIE,
    vote_average: movie.vote_average,
}) as MovieMapper;

export const transformTVShow = (tvShow: TVShowShema) => ({
    id: tvShow.id,
    adult: tvShow.adult,
    name: tvShow.name || tvShow.original_name,
    poster_path: tvShow.poster_path,
    media_type: MediaType.TV_SHOW,
    vote_average: tvShow.vote_average,
}) as TVShowMapper;

export const transformMovieDetails = (movie: MovieDetailsShema) => ({
    movie: {
        imdb_id: movie.imdb_id,
        adult: movie.adult,
        homepage: movie.homepage,
        budget: movie.budget,
        title: movie.title || movie.original_title,
        overview: movie.overview,
        status: movie.status,
        tagline: movie.tagline,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        popularity: movie.popularity,
        backdrop_path: movie.backdrop_path,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        revenue: movie.revenue,
        runtime: movie.runtime,
        genres: movie.genres.map((genre) => genre.name),
        original_language: movie.spoken_languages.find(
            (language) => language.iso_639_1 === movie.original_language
        )?.english_name || movie.original_language,
        origin_country: movie.origin_country.map(
            (originCountry) => movie.production_countries.find(
                (country) => originCountry === country.iso_3166_1
            )?.name || originCountry
        ),
        production_companies: movie.production_companies.map(
            (company) => ({
                logo_path: company.logo_path,
                name: company.name,
                origin_country: movie.production_countries.find(
                    (country) => company.origin_country === country.iso_3166_1
                )?.name || company.origin_country
            })
        ),
        spoken_languages: movie.spoken_languages.map(
            (language) => ({
                english_name: language.english_name,
                name: language.name
            })
        ),
    },
    cast: movie.credits.cast.map((cast) => transformCast(cast)),
    videos: movie.videos.results.filter(
        (video) => {
            if (video.site === VideoSiteType.YOUTUBE && (video.type === VideoType.TRAILER || video.type === VideoType.CLIP)) {
                return transformVideo(video);
            }
        }
    ),
    reviews: movie.reviews.results.map((review) => transformReview(review)),
    recommendations: movie.recommendations.results.map(
        (recommendation) => transformRecommendationMovie(recommendation)),
}) as MovieDetailsMapper;

export const transformMovieDetailsForSimilar = (movie: MovieDetailsForSimilarShema) => ({
    movie: {
        adult: movie.adult,
        title: movie.title || movie.original_title,
        vote_average: movie.vote_average,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        media_type: MediaType.MOVIE,
        genres: movie.genres.map((genre) => genre.name)
    },
    similar: movie.similar.results.map((similar) => transformSimilarMovie(similar)),
}) as MovieDetailsForSimilarMapper;

export const transformTVShowDetails = (tvShow: TVShowDetailsShema) => ({
    tvShow: {
        adult: tvShow.adult,
        homepage: tvShow.homepage,
        first_air_date: tvShow.first_air_date,
        last_air_date: tvShow.last_air_date,
        in_production: tvShow.in_production,
        name: tvShow.name || tvShow.original_name,
        number_of_episodes: tvShow.number_of_episodes,
        number_of_seasons: tvShow.number_of_seasons,
        overview: tvShow.overview,
        status: tvShow.status,
        tagline: tvShow.tagline,
        type: tvShow.type,
        vote_average: tvShow.vote_average,
        vote_count: tvShow.vote_count,
        popularity: tvShow.popularity,
        backdrop_path: tvShow.backdrop_path,
        poster_path: tvShow.poster_path,
        original_language: tvShow.spoken_languages.find(
            (language) => language.iso_639_1 === tvShow.original_language
        )?.english_name || tvShow.original_language,
        genres: tvShow.genres.map((genre) => genre.name),
        origin_country: tvShow.origin_country.map(
            (originCountry) => tvShow.production_countries.find(
                (country) => originCountry === country.iso_3166_1
            )?.name || originCountry
        ),
        production_companies: tvShow.production_companies.map(
            (company) => ({
                logo_path: company.logo_path,
                name: company.name,
                origin_country: tvShow.production_countries.find(
                    (country) => company.origin_country === country.iso_3166_1
                )?.name || company.origin_country
            })
        ),
        spoken_languages: tvShow.spoken_languages.map(
            (language) => ({
                english_name: language.english_name,
                name: language.name
            })
        ),
        created_by: tvShow.created_by.map(
            (created) => ({
                name: created.name || created.original_name,
                profile_path: created.profile_path
            })
        ),
        networks: tvShow.networks.map(
            (network) => ({
                logo_path: network.logo_path,
                name: network.name,
                origin_country: tvShow.production_countries.find(
                    (country) => network.origin_country === country.iso_3166_1
                )?.name || network.origin_country
            })
        ),
    },
    seasons: tvShow.seasons.map((season) => transformSeason(season)),
    cast: tvShow.credits.cast.map((cast) => transformCast(cast)),
    videos: tvShow.videos.results.filter(
        (video) => {
            if (video.site === VideoSiteType.YOUTUBE && video.type === VideoType.TRAILER) {
                return transformVideo(video);
            }
        }
    ),
    reviews: tvShow.reviews.results.map((review) => transformReview(review)),
    recommendations: tvShow.recommendations.results.map(
        (recommendation) => transformRecommendationTVShow(recommendation)),
}) as TVShowDetailsMapper;

export const transformTVShowDetailsForSimilar = (tvShow: TVShowDetailsForSimilarShema) => ({
    tvShow: {
        adult: tvShow.adult,
        first_air_date: tvShow.first_air_date,
        name: tvShow.name || tvShow.original_name,
        vote_average: tvShow.vote_average,
        poster_path: tvShow.poster_path,
        media_type: MediaType.TV_SHOW,
        genres: tvShow.genres.map((genre) => genre.name)
    },
    similar: tvShow.similar.results.map((similar) => transformSimilarTVShow(similar)),
}) as TVShowDetailsForSimilarMapper;

export const transformTVShowSeasonDetails = (season: TVShowSeasonDetailsShema) => ({
    season: {
        air_date: season.air_date,
        name: season.name,
        overview: season.overview,
        poster_path: season.poster_path,
        season_number: season.season_number,
        vote_average: season.vote_average,
    },
    episodes: season.episodes.map((episode) => transformEpisode(episode)),
}) as TVShowSeasonDetailsMapper;

export const transformEpisode = (episode: EpisodeShema) => ({
    air_date: episode.air_date,
    episode_number: episode.episode_number,
    episode_type: episode.episode_type,
    name: episode.name,
    overview: episode.overview,
    runtime: episode.runtime,
    season_number: episode.season_number,
    still_path: episode.still_path,
    vote_average: episode.vote_average,
    vote_count: episode.vote_count,
}) as EpisodeMapper;

export const transformSeason = (season: SeasonShema) => ({
    air_date: season.air_date,
    episode_count: season.episode_count,
    name: season.name,
    poster_path: season.poster_path,
    season_number: season.season_number,
    vote_average: season.vote_average
}) as SeasonMapper;

export const transformCast = (cast: CastShema) => ({
    name: cast.name || cast.original_name,
    popularity: cast.popularity,
    profile_path: cast.profile_path,
    character: cast.character,
}) as CastMapper;

export const transformVideo = (video: VideoShema) => ({
    name: video.name,
    key: video.key,
    type: video.type,
    published_at: video.published_at,
}) as VideoMapper;

export const transformReview = (review: ReviewShema) => ({
    author: {
        name: review.author_details.name,
        username: review.author_details.username,
        avatar_path: review.author_details.avatar_path,
        rating: review.author_details.rating,
    },
    content: review.content,
    created_at: review.created_at,
    updated_at: review.updated_at,
}) as ReviewMapper;

export const transformSimilarMovie = (movie: SimilarMovieShema) => ({
    id: movie.id,
    adult: movie.adult,
    title: movie.title || movie.original_title,
    poster_path: movie.poster_path,
    media_type: MediaType.MOVIE,
    vote_average: movie.vote_average,
}) as SimilarMovieMapper;

export const transformRecommendationMovie = (movie: RecommendationMovieShema) => ({
    id: movie.id,
    adult: movie.adult,
    title: movie.title || movie.original_title,
    poster_path: movie.poster_path,
    media_type: MediaType.MOVIE,
    vote_average: movie.vote_average,
}) as RecommendationMovieMapper;

export const transformSimilarTVShow = (tvShow: SimilarTVShowShema) => ({
    id: tvShow.id,
    adult: tvShow.adult,
    name: tvShow.name || tvShow.original_name,
    poster_path: tvShow.poster_path,
    media_type: MediaType.TV_SHOW,
    vote_average: tvShow.vote_average,
}) as SimilarTVShowMapper;

export const transformRecommendationTVShow = (tvShow: RecommendationTVShowShema) => ({
    id: tvShow.id,
    adult: tvShow.adult,
    name: tvShow.name || tvShow.original_name,
    poster_path: tvShow.poster_path,
    media_type: MediaType.TV_SHOW,
    vote_average: tvShow.vote_average,
}) as RecommendationTVShowMapper;