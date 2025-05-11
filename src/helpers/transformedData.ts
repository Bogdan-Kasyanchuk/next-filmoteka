import { MediaType } from '@/enums';
import { MovieDetailsShema, MovieShema, TVDetailsShema, TVShema } from '@/shemas';
import { MovieDetailsMapper, MovieMapper, TVDetailsMapper, TVMapper } from '@/types';

export const transformedMovie = (movie: MovieShema) => ({
    id: movie.id,
    title: movie.title || movie.original_title,
    poster_path: movie.poster_path,
    media_type: MediaType.MOVIE,
    vote_average: movie.vote_average,
}) as MovieMapper;

export const transformedTV = (tv: TVShema) => ({
    id: tv.id,
    name: tv.name || tv.original_name,
    poster_path: tv.poster_path,
    media_type: MediaType.TV,
    vote_average: tv.vote_average,
}) as TVMapper;

export const transformedMovieDetails = (movie: MovieDetailsShema) => ({
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
    poster_path: movie.poster_path,
    original_language: movie.original_language,
    release_date: movie.release_date,
    revenue: movie.revenue,
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
}) as MovieDetailsMapper;

export const transformedTVDetails = (tv: TVDetailsShema) => ({
    adult: tv.adult,
    homepage: tv.homepage,
    first_air_date: tv.first_air_date,
    last_air_date: tv.last_air_date,
    in_production: tv.in_production,
    name: tv.name || tv.original_name,
    number_of_episodes: tv.number_of_episodes,
    number_of_seasons: tv.number_of_seasons,
    original_language: tv.original_language,
    overview: tv.overview,
    status: tv.status,
    tagline: tv.tagline,
    type: tv.type,
    vote_average: tv.vote_average,
    vote_count: tv.vote_count,
    popularity: tv.popularity,
    poster_path: tv.poster_path,
    languages: tv.languages,
    genres: tv.genres.map(genre => genre.name),
    origin_country: tv.origin_country,
    production_companies: tv.production_companies.map(
        company => ({
            logo_path: company.logo_path,
            name: company.name,
            origin_country: tv.production_countries.find(
                country => company.origin_country === country.iso_3166_1)?.name
        })),
    spoken_languages: tv.spoken_languages.map(
        language => ({
            english_name: language.english_name,
            name: language.name
        })),
    created_by: tv.created_by.map(
        created => ({
            name: created.name || created.original_name,
            gender: created.gender,
            profile_path: created.profile_path
        })),
    seasons: tv.seasons.map(
        season => ({
            air_date: season.air_date,
            episode_count: season.episode_count,
            name: season.name,
            overview: season.overview,
            poster_path: season.poster_path,
            season_number: season.season_number,
            vote_average: season.vote_average
        })),
    networks: tv.networks.map(
        network => ({
            logo_path: network.logo_path,
            name: network.name,
            origin_country: network.origin_country
        }))
}) as TVDetailsMapper;