import { MediaType, VideoSiteType, VideoType } from '@/enums';
import {
    CastShema,
    CrewShema,
    CurrentMovieShema,
    CurrentTVShowShema,
    EpisodeShema,
    ImageShema,
    MediaCastShema,
    MediaCrewShema,
    MovieDetailsShema,
    MovieShema,
    NetworkDetailsShema,
    PersonDetailsShema,
    PersonShema,
    ProductionCompanyDetailsShema,
    ReviewShema,
    SeasonShema,
    SimilarMovieShema,
    SimilarTVShowShema,
    TVShowDetailsShema,
    TVShowSeasonDetailsShema,
    TVShowShema,
    VideoShema
} from '@/shemas';
import {
    CastMapper,
    CrewMapper,
    CurrentMovieMapper,
    CurrentTVShowMapper,
    EpisodeMapper,
    ImageMapper,
    MediaCastMapper,
    MediaCrewMapper,
    MovieDetailsMapper,
    MovieMapper,
    NetworkDetailsMapper,
    PersonDetailsMapper,
    PersonMapper,
    ProductionCompanyDetailsMapper,
    ReviewMapper,
    SeasonMapper,
    TVShowDetailsMapper,
    TVShowMapper,
    TVShowSeasonDetailsMapper,
    VideoMapper
} from '@/types';

import { EXTERNAL_ID_URLS } from './parameters';

export const transformMovie = (movie: MovieShema | SimilarMovieShema) => ({
    id: movie.id.toString(),
    adult: movie.adult,
    title: movie.title || movie.original_title,
    poster_path: movie.poster_path,
    media_type: MediaType.MOVIE,
    vote_average: movie.vote_average
}) as MovieMapper;

export const transformMovieDetails = (movie: MovieDetailsShema) => ({
    movie: {
        adult: movie.adult,
        homepage: movie.homepage,
        budget: movie.budget,
        title: movie.title || movie.original_title,
        overview: movie.overview,
        tagline: movie.tagline,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        popularity: movie.popularity,
        backdrop_path: movie.backdrop_path,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        revenue: movie.revenue,
        runtime: movie.runtime,
        genres: movie.genres.map(genre => genre.name),
        original_language: movie.spoken_languages.find(
            language => language.iso_639_1 === movie.original_language
        )?.english_name || movie.original_language,
        origin_country: movie.origin_country.map(
            originCountry => movie.production_countries.find(
                country => originCountry === country.iso_3166_1
            )?.name || originCountry
        ),
        production_companies: movie.production_companies.map(
            company => ({
                id: company.id.toString(),
                logo_path: company.logo_path,
                name: company.name,
                origin_country: movie.production_countries.find(
                    country => company.origin_country === country.iso_3166_1
                )?.name || company.origin_country
            })
        ),
        spoken_languages: movie.spoken_languages.map(
            language => ({
                english_name: language.english_name,
                name: language.name
            })
        ),
        socialLinks: transformMovieOrTVShowExternalIds(movie.external_ids)
    },
    cast: movie.credits.cast.map(cast => transformCast(cast)),
    crew: movie.credits.crew.map(crew => transformCrew(crew)),
    videos: movie.videos.results.filter(
        video => {
            if (video.site === VideoSiteType.YOUTUBE && (video.type === VideoType.TRAILER || video.type === VideoType.CLIP)) {
                return transformVideo(video);
            }
        }
    ),
    reviews: {
        items: movie.reviews.results.map(review => transformReview(review)),
        totalPages: movie.reviews.total_pages
    },
    recommendations: {
        items: movie.recommendations.results.map(
            movie => transformMovie(movie)
        ),
        totalPages: movie.recommendations.total_pages
    }
}) as MovieDetailsMapper;

export const transformCurrentMovie = (movie: CurrentMovieShema) => ({
    adult: movie.adult,
    title: movie.title || movie.original_title,
    vote_average: movie.vote_average,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    media_type: MediaType.MOVIE,
    genres: movie.genres.map(genre => genre.name)
}) as CurrentMovieMapper;

export const transformTVShow = (tvShow: TVShowShema | SimilarTVShowShema) => ({
    id: tvShow.id.toString(),
    adult: tvShow.adult,
    name: tvShow.name || tvShow.original_name,
    poster_path: tvShow.poster_path,
    media_type: MediaType.TV_SHOW,
    vote_average: tvShow.vote_average
}) as TVShowMapper;

export const transformTVShowDetails = (tvShow: TVShowDetailsShema) => ({
    tvShow: {
        adult: tvShow.adult,
        homepage: tvShow.homepage,
        first_air_date: tvShow.first_air_date,
        last_air_date: tvShow.last_air_date,
        name: tvShow.name || tvShow.original_name,
        number_of_episodes: tvShow.number_of_episodes,
        number_of_seasons: tvShow.number_of_seasons,
        overview: tvShow.overview,
        tagline: tvShow.tagline,
        type: tvShow.type,
        vote_average: tvShow.vote_average,
        vote_count: tvShow.vote_count,
        popularity: tvShow.popularity,
        backdrop_path: tvShow.backdrop_path,
        poster_path: tvShow.poster_path,
        original_language: tvShow.spoken_languages.find(
            language => language.iso_639_1 === tvShow.original_language
        )?.english_name || tvShow.original_language,
        genres: tvShow.genres.map(genre => genre.name),
        origin_country: tvShow.origin_country.map(
            originCountry => tvShow.production_countries.find(
                country => originCountry === country.iso_3166_1
            )?.name || originCountry
        ),
        production_companies: tvShow.production_companies.map(
            company => ({
                id: company.id.toString(),
                logo_path: company.logo_path,
                name: company.name,
                origin_country: tvShow.production_countries.find(
                    country => company.origin_country === country.iso_3166_1
                )?.name || company.origin_country
            })
        ),
        spoken_languages: tvShow.spoken_languages.map(
            language => ({
                english_name: language.english_name,
                name: language.name
            })
        ),
        created_by: tvShow.created_by.map(
            created => ({
                id: created.id.toString(),
                name: created.name || created.original_name,
                profile_path: created.profile_path
            })
        ),
        networks: tvShow.networks.map(
            network => ({
                id: network.id.toString(),
                logo_path: network.logo_path,
                name: network.name,
                origin_country: tvShow.production_countries.find(
                    country => network.origin_country === country.iso_3166_1
                )?.name || network.origin_country
            })
        ),
        socialLinks: transformMovieOrTVShowExternalIds(tvShow.external_ids)
    },
    seasons: tvShow.seasons.map(season => transformSeason(season)),
    cast: tvShow.credits.cast.map(cast => transformCast(cast)),
    crew: tvShow.credits.crew.map(crew => transformCrew(crew)),
    videos: tvShow.videos.results.filter(
        video => {
            if (video.site === VideoSiteType.YOUTUBE && video.type === VideoType.TRAILER) {
                return transformVideo(video);
            }
        }
    ),
    reviews: {
        items: tvShow.reviews.results.map(review => transformReview(review)),
        totalPages: tvShow.reviews.total_pages
    },
    recommendations: {
        items: tvShow.recommendations.results.map(
            tvShow => transformTVShow(tvShow)
        ),
        totalPages: tvShow.recommendations.total_pages
    }
}) as TVShowDetailsMapper;

export const transformCurrentTVShow = (tvShow: CurrentTVShowShema) => ({
    adult: tvShow.adult,
    first_air_date: tvShow.first_air_date,
    name: tvShow.name || tvShow.original_name,
    vote_average: tvShow.vote_average,
    poster_path: tvShow.poster_path,
    media_type: MediaType.TV_SHOW,
    genres: tvShow.genres.map(genre => genre.name)
}) as CurrentTVShowMapper;

export const transformTVShowSeasonDetails = (season: TVShowSeasonDetailsShema) => ({
    season: {
        air_date: season.air_date,
        name: season.name,
        overview: season.overview,
        poster_path: season.poster_path,
        season_number: season.season_number,
        vote_average: season.vote_average
    },
    episodes: season.episodes.map(episode => transformEpisode(episode))
}) as TVShowSeasonDetailsMapper;

export const transformPerson = (person: PersonShema) => ({
    adult: person.adult,
    id: person.id.toString(),
    known_for_department: person.known_for_department,
    name: person.name,
    media_type: MediaType.PERSON,
    popularity: person.popularity,
    profile_path: person.profile_path
}) as PersonMapper;

export const transformPersonDetails = (person: PersonDetailsShema) => ({
    person: {
        adult: person.adult,
        also_known_as: person.also_known_as,
        biography: person.biography,
        birthday: person.birthday,
        deathday: person.deathday,
        homepage: person.homepage,
        known_for_department: person.known_for_department,
        name: person.name,
        place_of_birth: person.place_of_birth,
        popularity: person.popularity,
        profile_path: person.profile_path,
        socialLinks: transformPersonExternalIds(person.external_ids)
    },
    cast: person.combined_credits.cast.map(media => transformMediaCast(media)),
    crew: person.combined_credits.crew.map(media => transformMediaCrew(media)),
    images: person.images.profiles.map(image => transformImage(image))
}) as PersonDetailsMapper;

export const transformReview = (review: ReviewShema) => ({
    author: {
        name: review.author_details.name,
        username: review.author_details.username,
        avatar_path: review.author_details.avatar_path,
        rating: review.author_details.rating
    },
    content: review.content,
    created_at: review.created_at,
    updated_at: review.updated_at
}) as ReviewMapper;

export const transformNetworkDetails = (network: NetworkDetailsShema) => ({
    headquarters: network.headquarters,
    homepage: network.homepage
}) as NetworkDetailsMapper;

export const transformProductionCompanyDetails = (company: ProductionCompanyDetailsShema) => ({
    description: company.description,
    headquarters: company.headquarters,
    homepage: company.homepage,
    parent_company: !company.parent_company
        ? null
        : typeof company.parent_company === 'string'
            ? company.parent_company
            : company.parent_company.name
}) as ProductionCompanyDetailsMapper;

const transformSeason = (season: SeasonShema) => ({
    air_date: season.air_date,
    episode_count: season.episode_count,
    name: season.name,
    poster_path: season.poster_path,
    season_number: season.season_number,
    vote_average: season.vote_average
}) as SeasonMapper;

const transformEpisode = (episode: EpisodeShema) => ({
    air_date: episode.air_date,
    episode_number: episode.episode_number,
    episode_type: episode.episode_type,
    name: episode.name,
    overview: episode.overview,
    runtime: episode.runtime,
    still_path: episode.still_path,
    vote_average: episode.vote_average,
    vote_count: episode.vote_count
}) as EpisodeMapper;

const transformCast = (cast: CastShema) => ({
    id: cast.id.toString(),
    name: cast.name || cast.original_name,
    popularity: cast.popularity,
    profile_path: cast.profile_path,
    character: cast.character
}) as CastMapper;

const transformCrew = (crew: CrewShema) => ({
    id: crew.id.toString(),
    name: crew.name || crew.original_name,
    popularity: crew.popularity,
    profile_path: crew.profile_path,
    job: crew.job
}) as CrewMapper;

const transformVideo = (video: VideoShema) => ({
    name: video.name,
    key: video.key,
    type: video.type,
    published_at: video.published_at
}) as VideoMapper;

const transformMediaCast = (media: MediaCastShema) => ({
    id: media.id.toString(),
    title: media.media_type === MediaType.MOVIE
        ? media.title || media.original_title
        : media.name || media.original_name,
    poster_path: media.poster_path,
    release_date: media.release_date,
    character: media.character,
    media_type: media.media_type
}) as MediaCastMapper;

const transformMediaCrew = (media: MediaCrewShema) => ({
    id: media.id.toString(),
    title: media.media_type === MediaType.MOVIE
        ? media.title || media.original_title
        : media.name || media.original_name,
    poster_path: media.poster_path,
    release_date: media.release_date,
    job: media.job,
    media_type: media.media_type
}) as MediaCrewMapper;

const transformImage = (image: ImageShema) => ({
    height: image.height,
    width: image.width,
    file_path: image.file_path,
    vote_average: image.vote_average,
    vote_count: image.vote_count
}) as ImageMapper;

const transformMovieOrTVShowExternalIds = (
    ids: MovieDetailsShema['external_ids'] | TVShowDetailsShema['external_ids']
) => {
    const links = {
        imdb: ids.imdb_id ? `${ EXTERNAL_ID_URLS.IMDB }/title/${ ids.imdb_id }` : '',
        wikidata: ids.wikidata_id ? `${ EXTERNAL_ID_URLS.WIKIDATA }/${ ids.wikidata_id }` : '',
        facebook: ids.facebook_id ? `${ EXTERNAL_ID_URLS.FACEBOOK }/${ ids.facebook_id }` : '',
        instagram: ids.instagram_id ? `${ EXTERNAL_ID_URLS.INSTAGRAM }/${ ids.instagram_id }` : '',
        twitter: ids.twitter_id ? `${ EXTERNAL_ID_URLS.TWITTER }/${ ids.twitter_id }` : ''
    };

    return Object.entries(links)
        .filter(social => social[ 1 ])
        .map(social => ({
            provider: social[ 0 ],
            link: social[ 1 ]
        }));
};

const transformPersonExternalIds = (ids: PersonDetailsShema['external_ids']) => {
    const links = {
        imdb: ids.imdb_id ? `${ EXTERNAL_ID_URLS.IMDB }/name/${ ids.imdb_id }` : '',
        wikidata: ids.wikidata_id ? `${ EXTERNAL_ID_URLS.WIKIDATA }/${ ids.wikidata_id }` : '',
        facebook: ids.facebook_id ? `${ EXTERNAL_ID_URLS.FACEBOOK }/${ ids.facebook_id }` : '',
        instagram: ids.instagram_id ? `${ EXTERNAL_ID_URLS.INSTAGRAM }/${ ids.instagram_id }` : '',
        twitter: ids.twitter_id ? `${ EXTERNAL_ID_URLS.TWITTER }/${ ids.twitter_id }` : '',
        tiktok: ids.tiktok_id ? `${ EXTERNAL_ID_URLS.TIKTOK }/@${ ids.tiktok_id }` : '',
        youtube: ids.youtube_id ? `${ EXTERNAL_ID_URLS.YOUTUBE }/${ ids.youtube_id }` : ''
    };

    return Object.entries(links)
        .filter(social => social[ 1 ])
        .map(social => ({
            provider: social[ 0 ],
            link: social[ 1 ]
        }));
};