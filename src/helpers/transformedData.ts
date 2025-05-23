import { MediaType } from '@/enums';
import { CastShema, MovieDetailsShema, MovieShema, RecommendationMovieShema, RecommendationTVShowShema, ReviewShema, TVShowDetailsShema, TVShowShema, VideoShema } from '@/shemas';
import { CastMapper, MovieDetailsMapper, MovieMapper, RecommendationMovieMapper, RecommendationTVShowMapper, ReviewMapper, TVShowDetailsMapper, TVShowMapper, VideoMapper } from '@/types';

export const transformedMovie = (movie: MovieShema) => ({
    id: movie.id,
    title: movie.title || movie.original_title,
    poster_path: movie.poster_path,
    media_type: MediaType.MOVIE,
    vote_average: movie.vote_average,
}) as MovieMapper;

export const transformedTVShow = (tvShow: TVShowShema) => ({
    id: tvShow.id,
    name: tvShow.name || tvShow.original_name,
    poster_path: tvShow.poster_path,
    media_type: MediaType.TV_SHOW,
    vote_average: tvShow.vote_average,
}) as TVShowMapper;

export const transformedMovieDetails = (movie: MovieDetailsShema) => ({
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
        original_language: movie.original_language,
        release_date: movie.release_date,
        revenue: movie.revenue,
        runtime: movie.runtime,
        genres: movie.genres.map(genre => genre.name),
        origin_country: movie.origin_country,
        production_companies: movie.production_companies.map(
            company => ({
                logo_path: company.logo_path,
                name: company.name,
                origin_country: movie.production_countries.find(
                    country => company.origin_country === country.iso_3166_1)?.name
            })),
        spoken_languages: movie.spoken_languages.map(
            language => ({
                english_name: language.english_name,
                name: language.name
            })),
    },
    cast: movie.credits.cast.map(cast => transformedCast(cast)),
    videos: movie.videos.results.map(video => transformedVideo(video)),
    reviews: movie.reviews.results.map(review => transformedReview(review)),
    recommendations: movie.recommendations.results.map(
        recommendation => transformedRecommendationMovie(recommendation)),
}) as MovieDetailsMapper;

export const transformedTVShowDetails = (tvShow: TVShowDetailsShema) => ({
    adult: tvShow.adult,
    homepage: tvShow.homepage,
    first_air_date: tvShow.first_air_date,
    last_air_date: tvShow.last_air_date,
    in_production: tvShow.in_production,
    name: tvShow.name || tvShow.original_name,
    number_of_episodes: tvShow.number_of_episodes,
    number_of_seasons: tvShow.number_of_seasons,
    original_language: tvShow.original_language,
    overview: tvShow.overview,
    status: tvShow.status,
    tagline: tvShow.tagline,
    type: tvShow.type,
    vote_average: tvShow.vote_average,
    vote_count: tvShow.vote_count,
    popularity: tvShow.popularity,
    backdrop_path: tvShow.backdrop_path,
    poster_path: tvShow.poster_path,
    languages: tvShow.languages,
    genres: tvShow.genres.map(genre => genre.name),
    origin_country: tvShow.origin_country,
    production_companies: tvShow.production_companies.map(
        company => ({
            logo_path: company.logo_path,
            name: company.name,
            origin_country: tvShow.production_countries.find(
                country => company.origin_country === country.iso_3166_1)?.name
        })),
    spoken_languages: tvShow.spoken_languages.map(
        language => ({
            english_name: language.english_name,
            name: language.name
        })),
    created_by: tvShow.created_by.map(
        created => ({
            name: created.name || created.original_name,
            gender: created.gender,
            profile_path: created.profile_path
        })),
    seasons: tvShow.seasons.map(
        season => ({
            air_date: season.air_date,
            episode_count: season.episode_count,
            name: season.name,
            overview: season.overview,
            poster_path: season.poster_path,
            season_number: season.season_number,
            vote_average: season.vote_average
        })),
    networks: tvShow.networks.map(
        network => ({
            logo_path: network.logo_path,
            name: network.name,
            origin_country: network.origin_country
        })),
    cast: tvShow.credits.cast.map(cast => transformedCast(cast)),
    videos: tvShow.videos.results.map(video => transformedVideo(video)),
    reviews: tvShow.reviews.results.map(review => transformedReview(review)),
    recommendations: tvShow.recommendations.results.map(
        recommendation => transformedRecommendationTVShow(recommendation)),
}) as TVShowDetailsMapper;

export const transformedCast = (cast: CastShema) => ({
    gender: cast.gender,
    name: cast.name || cast.original_name,
    popularity: cast.popularity,
    profile_path: cast.profile_path,
    character: cast.character,
}) as CastMapper;

export const transformedVideo = (video: VideoShema) => ({
    iso_3166_1: video.iso_3166_1,
    name: video.name,
    key: video.key,
    site: video.site,
    size: video.size,
    type: video.type,
    official: video.official,
    published_at: video.published_at,
}) as VideoMapper;

export const transformedReview = (review: ReviewShema) => ({
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

export const transformedRecommendationMovie = (recommendation: RecommendationMovieShema) => ({
    id: recommendation.id,
    title: recommendation.title || recommendation.original_title,
    poster_path: recommendation.poster_path,
    media_type: MediaType.MOVIE,
    vote_average: recommendation.vote_average,
}) as RecommendationMovieMapper;

export const transformedRecommendationTVShow = (recommendation: RecommendationTVShowShema) => ({
    id: recommendation.id,
    name: recommendation.name || recommendation.original_name,
    poster_path: recommendation.poster_path,
    media_type: MediaType.TV_SHOW,
    vote_average: recommendation.vote_average,
}) as RecommendationTVShowMapper;