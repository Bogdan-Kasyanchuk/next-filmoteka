import { MediaType } from '@/enums';
import {
    facebookUrl,
    imdbUrl,
    instagramUrl,
    tiktokUrl,
    twitterUrl,
    wikidataUrl,
    youtubeUrl
} from '@/helpers/externalUrls';
import {
    CastShema,
    CompanyDetailsShema,
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
    ReviewShema,
    SeasonDetailsShema,
    SeasonShema,
    SimilarMovieShema,
    SimilarTVShowShema,
    TVShowDetailsShema,
    TVShowShema,
    VideoShema
} from '@/shemas';
import {
    CastMapper,
    CompanyDetailsMapper,
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
    ReviewMapper,
    SeasonDetailsMapper,
    SeasonMapper,
    SocialLinkMapper,
    TVShowDetailsMapper,
    TVShowMapper,
    VideoMapper
} from '@/types';
import normalizeId from '@/utils/normalizeId';

export const transformMovie = (
    movie: MovieShema | SimilarMovieShema
): MovieMapper => ({
    id: normalizeId(movie.id),
    adult: movie.adult,
    release_date: movie.release_date ? new Date(movie.release_date) : null,
    title: movie.title || movie.original_title,
    poster_path: movie.poster_path,
    media_type: MediaType.MOVIE,
    vote_average: movie.vote_average
});

export const transformMovieDetails = (
    movie: MovieDetailsShema
): MovieDetailsMapper => ({
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
        release_date: movie.release_date ? new Date(movie.release_date) : null,
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
                id: normalizeId(company.id),
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
    cast: movie.credits.cast.map(transformCast),
    crew: movie.credits.crew.map(transformCrew)
});

export const transformCurrentMovie = (
    movie: CurrentMovieShema
): CurrentMovieMapper => ({
    adult: movie.adult,
    title: movie.title || movie.original_title,
    vote_average: movie.vote_average,
    poster_path: movie.poster_path,
    release_date: movie.release_date ? new Date(movie.release_date) : null,
    genres: movie.genres.map(genre => genre.name)
});

export const transformTVShow = (
    tvShow: TVShowShema | SimilarTVShowShema
): TVShowMapper => ({
    id: normalizeId(tvShow.id),
    adult: tvShow.adult,
    first_air_date: tvShow.first_air_date ? new Date(tvShow.first_air_date) : null,
    name: tvShow.name || tvShow.original_name,
    poster_path: tvShow.poster_path,
    media_type: MediaType.TV_SHOW,
    vote_average: tvShow.vote_average
});

export const transformTVShowDetails = (
    tvShow: TVShowDetailsShema
): TVShowDetailsMapper => ({
    tvShow: {
        adult: tvShow.adult,
        homepage: tvShow.homepage,
        first_air_date: tvShow.first_air_date ? new Date(tvShow.first_air_date) : null,
        last_air_date: tvShow.last_air_date ? new Date(tvShow.last_air_date) : null,
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
                id: normalizeId(company.id),
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
                id: normalizeId(created.id),
                name: created.name || created.original_name,
                profile_path: created.profile_path
            })
        ),
        networks: tvShow.networks.map(
            network => ({
                id: normalizeId(network.id),
                logo_path: network.logo_path,
                name: network.name,
                origin_country: tvShow.production_countries.find(
                    country => network.origin_country === country.iso_3166_1
                )?.name || network.origin_country
            })
        ),
        socialLinks: transformMovieOrTVShowExternalIds(tvShow.external_ids)
    },
    seasons: tvShow.seasons.map(transformSeason),
    cast: tvShow.credits.cast.map(transformCast),
    crew: tvShow.credits.crew.map(transformCrew)
});

export const transformCurrentTVShow = (
    tvShow: CurrentTVShowShema
): CurrentTVShowMapper => ({
    adult: tvShow.adult,
    first_air_date: tvShow.first_air_date ? new Date(tvShow.first_air_date) : null,
    name: tvShow.name || tvShow.original_name,
    vote_average: tvShow.vote_average,
    poster_path: tvShow.poster_path,
    genres: tvShow.genres.map(genre => genre.name)
});

export const transformTVShowSeasonDetails = (
    season: SeasonDetailsShema
): SeasonDetailsMapper => ({
    season: {
        air_date: season.air_date ? new Date(season.air_date) : null,
        name: season.name,
        overview: season.overview,
        poster_path: season.poster_path,
        season_number: season.season_number,
        vote_average: season.vote_average
    },
    episodes: season.episodes.map(transformEpisode)
});

export const transformPerson = (
    person: PersonShema
): PersonMapper => ({
    adult: person.adult,
    id: normalizeId(person.id),
    known_for_department: person.known_for_department,
    name: person.name,
    media_type: MediaType.PERSON,
    popularity: person.popularity,
    profile_path: person.profile_path
});

export const transformPersonDetails = (
    person: PersonDetailsShema
): PersonDetailsMapper => ({
    person: {
        adult: person.adult,
        also_known_as: person.also_known_as,
        biography: person.biography,
        birthday: person.birthday ? new Date(person.birthday) : null,
        deathday: person.deathday ? new Date(person.deathday) : null,
        homepage: person.homepage,
        known_for_department: person.known_for_department,
        name: person.name,
        place_of_birth: person.place_of_birth,
        popularity: person.popularity,
        profile_path: person.profile_path,
        socialLinks: transformPersonExternalIds(person.external_ids)
    },
    cast: person.combined_credits.cast.map(transformMediaCast),
    crew: person.combined_credits.crew.map(transformMediaCrew),
    images: person.images.profiles.map(transformImage)
});

export const transformReview = (
    review: ReviewShema
): ReviewMapper => ({
    author: {
        name: review.author_details.name,
        username: review.author_details.username,
        avatar_path: review.author_details.avatar_path,
        rating: review.author_details.rating
    },
    content: review.content,
    created_at: review.created_at ? new Date(review.created_at) : null,
    updated_at: review.updated_at ? new Date(review.updated_at) : null
});

export const transformNetworkDetails = (
    network: NetworkDetailsShema
): NetworkDetailsMapper => ({
    headquarters: network.headquarters,
    homepage: network.homepage
});

export const transformCompanyDetails = (
    company: CompanyDetailsShema
): CompanyDetailsMapper => ({
    description: company.description,
    headquarters: company.headquarters,
    homepage: company.homepage,
    parent_company: !company.parent_company
        ? null
        : typeof company.parent_company === 'string'
            ? company.parent_company
            : company.parent_company.name
});

export const transformVideo = (
    video: VideoShema
): VideoMapper => ({
    name: video.name,
    key: video.key,
    type: video.type,
    published_at: video.published_at
});

const transformSeason = (
    season: SeasonShema
): SeasonMapper => ({
    air_date: season.air_date ? new Date(season.air_date) : null,
    episode_count: season.episode_count,
    name: season.name,
    poster_path: season.poster_path,
    season_number: season.season_number,
    vote_average: season.vote_average
});

const transformEpisode = (
    episode: EpisodeShema
): EpisodeMapper => ({
    air_date: episode.air_date ? new Date(episode.air_date) : null,
    episode_number: episode.episode_number,
    episode_type: episode.episode_type,
    name: episode.name,
    overview: episode.overview,
    runtime: episode.runtime,
    still_path: episode.still_path,
    vote_average: episode.vote_average,
    vote_count: episode.vote_count
});

const transformCast = (
    cast: CastShema
): CastMapper => ({
    id: normalizeId(cast.id),
    name: cast.name || cast.original_name,
    popularity: cast.popularity,
    profile_path: cast.profile_path,
    character: cast.character
});

const transformCrew = (
    crew: CrewShema
): CrewMapper => ({
    id: normalizeId(crew.id),
    name: crew.name || crew.original_name,
    popularity: crew.popularity,
    profile_path: crew.profile_path,
    job: crew.job
});

const transformMediaCast = (
    media: MediaCastShema
): MediaCastMapper => ({
    id: normalizeId(media.id),
    title: media.media_type === MediaType.MOVIE
        ? media.title || media.original_title
        : media.name || media.original_name,
    poster_path: media.poster_path,
    release_date: media.release_date ? new Date(media.release_date) : null,
    character: media.character,
    media_type: media.media_type
});

const transformMediaCrew = (
    media: MediaCrewShema
): MediaCrewMapper => ({
    id: normalizeId(media.id),
    title: media.media_type === MediaType.MOVIE
        ? media.title || media.original_title
        : media.name || media.original_name,
    poster_path: media.poster_path,
    release_date: media.release_date ? new Date(media.release_date) : null,
    job: media.job,
    media_type: media.media_type
});

const transformImage = (
    image: ImageShema
): ImageMapper => ({
    height: image.height,
    width: image.width,
    file_path: image.file_path,
    vote_average: image.vote_average,
    vote_count: image.vote_count
});

const filterExternalIds = (
    links: Record<string, string | null | undefined>
): SocialLinkMapper[] => {
    return Object.entries(links)
        .filter(([ , link ]) => Boolean(link))
        .map(([ provider, link ]) => ({
            provider,
            link: link as string
        }));
};

const transformMovieOrTVShowExternalIds = (
    ids: MovieDetailsShema['external_ids'] | TVShowDetailsShema['external_ids']
) => {
    const links = {
        imdb: ids.imdb_id && imdbUrl(ids.imdb_id, 'title'),
        wikidata: ids.wikidata_id && wikidataUrl(ids.wikidata_id),
        facebook: ids.facebook_id && facebookUrl(ids.facebook_id),
        instagram: ids.instagram_id && instagramUrl(ids.instagram_id),
        twitter: ids.twitter_id && twitterUrl(ids.twitter_id)
    };

    return filterExternalIds(links);
};

const transformPersonExternalIds = (
    ids: PersonDetailsShema['external_ids']
) => {
    const links = {
        imdb: ids.imdb_id && imdbUrl(ids.imdb_id, 'name'),
        wikidata: ids.wikidata_id && wikidataUrl(ids.wikidata_id),
        facebook: ids.facebook_id && facebookUrl(ids.facebook_id),
        instagram: ids.instagram_id && instagramUrl(ids.instagram_id),
        twitter: ids.twitter_id && twitterUrl(ids.twitter_id),
        tiktok: ids.tiktok_id && tiktokUrl(ids.tiktok_id),
        youtube: ids.youtube_id && youtubeUrl(ids.youtube_id)
    };

    return filterExternalIds(links);
};