import Image from 'next/image';
import { Fragment } from 'react';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { PARAMETERS, IMG_SIZES } from '@/helpers/parameters';
import { TVShowDetailsMapper } from '@/types';
import { formatDate } from '@/utils/formateDate';

type Props = TVShowDetailsMapper['tvShow'];

export default function TVShowDetails(props: Props) {
    const originalLanguage = props.spoken_languages.find(
        (language) => language.iso_639_1 === props.original_language
    );

    console.log(props.created_by);
    console.log(props.networks);

    return (
        <div className='с-tv-show-details-card'>
            <div className='с-tv-show-details-card__backdrop'>
                <Image
                    src={`${PARAMETERS.URL_IMG}/${IMG_SIZES.MEDIA_CARD_DETAILS_BACKDROP}/${props.backdrop_path}`}
                    sizes="(max-width: 767px) 768px, (max-width: 1319px) 1320px, 1920px"
                    alt={props.name}
                    fill
                />
            </div>

            <Container className='с-tv-show-details-card__container'>
                <div className='с-tv-show-details-card__cover'>
                    {
                        props.adult &&
                        <div className='с-tv-show-details-card__adult'>
                            18
                            <span>+</span>
                        </div>
                    }

                    <Image
                        src={
                            props.poster_path
                                ? `${PARAMETERS.URL_IMG}/${IMG_SIZES.MEDIA_CARD_DETAILS_COVER}/${props.poster_path}`
                                : '/img/poster-not-available.jpg'
                        }
                        sizes="500px"
                        alt={props.name}
                        fill
                    />
                </div>

                <Title className='с-tv-show-details-card__title'>
                    {props.name}&nbsp;({formatDate(props.first_air_date, 'YYYY')})
                </Title>

                <ul className='с-tv-show-details-card__list-rounds'>
                    <li className='с-tv-show-details-card__list-rounds-item'>
                        {(props.vote_average / 10 * 100).toFixed(0)}
                        <span>%</span>
                    </li>

                    <li className='с-tv-show-details-card__list-rounds-item'>
                        {props.vote_count}
                        <span>votes</span>
                    </li>

                    <li className='с-tv-show-details-card__list-rounds-item'>
                        {props.popularity.toFixed(0)}
                        <span>popularity</span>
                    </li>

                    <li className='с-tv-show-details-card__list-rounds-item'>
                        {props.number_of_seasons}
                        <span>seasons</span>
                    </li>

                    <li className='с-tv-show-details-card__list-rounds-item'>
                        {props.number_of_episodes}
                        <span>episodes</span>
                    </li>
                </ul>

                <ul className='с-tv-show-details-card__list-info'>
                    <li className='с-tv-show-details-card__list-info-item с-tv-show-details-card__list-info-item--tagline'>
                        &quot;{props.tagline}&quot;
                    </li>
                    <li className='с-tv-show-details-card__list-info-item с-tv-show-details-card__list-info-item--link'>
                        <span>WebSite:</span>
                        <a
                            href={props.homepage}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            {props.homepage}
                        </a>
                    </li>

                    <li className='с-tv-show-details-card__list-info-item'>
                        <span>First air date:</span>
                        <span>{formatDate(props.first_air_date, 'DD.MM.YYYY')}</span>
                    </li>

                    <li className='с-tv-show-details-card__list-info-item'>
                        <span>Last air date:</span>
                        <span>{formatDate(props.last_air_date, 'DD.MM.YYYY')}</span>
                    </li>

                    <li className='с-tv-show-details-card__list-info-item'>
                        <span>In production:</span>
                        <span>{props.in_production ? 'Yes' : 'No'}</span>
                    </li>

                    <li className='с-tv-show-details-card__list-info-item'>
                        <span>Type:</span>
                        <span>{props.type}</span>
                    </li>

                    <li className='с-tv-show-details-card__list-info-item'>
                        <span>Status:</span>
                        <span>{props.status}</span>
                    </li>

                    <li className='с-tv-show-details-card__list-info-item'>
                        <span className='self-start'>Genres:</span>
                        <span>
                            {
                                props.genres.map(
                                    (genre, index) => (
                                        <Fragment key={index}>
                                            {index !== 0 && <>&nbsp;|&nbsp;</>}
                                            {genre}
                                        </Fragment>
                                    ))
                            }
                        </span>
                    </li>

                    <li className='с-tv-show-details-card__list-info-item'>
                        <span>Original language:</span>
                        <span>
                            {originalLanguage?.name || originalLanguage?.english_name}
                        </span>
                    </li>

                    <li className='с-tv-show-details-card__list-info-item'>
                        <span className='self-start'>Spoken languages:</span>
                        <span>
                            {
                                props.spoken_languages.map(
                                    (language, index) => (
                                        <Fragment key={index}>
                                            {index !== 0 && <>&nbsp;|&nbsp;</>}
                                            {language.name || language.english_name}
                                        </Fragment>
                                    ))
                            }
                        </span>
                    </li>

                    <li className='с-tv-show-details-card__list-info-item'>
                        <span className='self-start'>Countries:</span>
                        <span>
                            {
                                props.origin_country.map(
                                    (country, index) => (
                                        <Fragment key={index}>
                                            {index !== 0 && <>&nbsp;|&nbsp;</>}
                                            {country}
                                        </Fragment>
                                    ))
                            }
                        </span>
                    </li>
                </ul>

                <div className='с-tv-show-details-card__creators'>
                    <p className='с-tv-show-details-card__creators-title'>
                        Creators:
                    </p>
                    <ul className='с-tv-show-details-card__creators-list'>
                        {
                            props.created_by.map(
                                (creator, index) => (
                                    <li
                                        key={index}
                                        className='с-tv-show-details-card__creators-item'
                                    >
                                        <div className='с-tv-show-details-card__creators-logo'>
                                            <Image
                                                src={
                                                    !creator.profile_path
                                                        ? `${PARAMETERS.URL_IMG}/${IMG_SIZES.CREATOR_AVATAR}/${creator.profile_path}`
                                                        : '/img/photo-not-available.jpg'
                                                }
                                                fill
                                                sizes='50px'
                                                alt={creator.name}
                                            />
                                        </div>
                                        <div className='с-tv-show-details-card__creators-content'>
                                            {creator.name}
                                        </div>
                                    </li>
                                ))
                        }
                    </ul>
                </div>

                <div className='с-tv-show-details-card__networks'>
                    <p className='с-tv-show-details-card__networks-title'>
                        Networks:
                    </p>
                    <ul className='с-tv-show-details-card__networks-list'>
                        {
                            props.networks.map(
                                (network, index) => (
                                    <li
                                        key={index}
                                        className='с-tv-show-details-card__networks-item'
                                    >
                                        <div className='с-tv-show-details-card__networks-logo'>
                                            <Image
                                                src={
                                                    network.logo_path
                                                        ? `${PARAMETERS.URL_IMG}/${IMG_SIZES.NETWORK_LOGO}/${network.logo_path}`
                                                        : '/img/poster-not-available.jpg'
                                                }
                                                fill
                                                sizes='50px'
                                                alt={network.name}
                                            />
                                        </div>
                                        <div className='с-tv-show-details-card__networks-content'>
                                            <span className='text-lg font-semibold'>
                                                {network.name}
                                            </span>
                                            <span className='opacity-75 text-sm'>
                                                {network.origin_country}
                                            </span>
                                        </div>
                                    </li>
                                ))
                        }
                    </ul>
                </div>

                <div className='с-tv-show-details-card__companies'>
                    <p className='с-tv-show-details-card__companies-title'>
                        Production companies:
                    </p>
                    <ul className='с-tv-show-details-card__companies-list'>
                        {
                            props.production_companies.map(
                                (company, index) => (
                                    <li
                                        key={index}
                                        className='с-tv-show-details-card__companies-item'
                                    >
                                        <div className='с-tv-show-details-card__companies-logo'>
                                            <Image
                                                src={
                                                    company.logo_path
                                                        ? `${PARAMETERS.URL_IMG}/${IMG_SIZES.COMPANY_LOGO}/${company.logo_path}`
                                                        : '/img/poster-not-available.jpg'
                                                }
                                                fill
                                                sizes='50px'
                                                alt={company.name}
                                            />
                                        </div>
                                        <div className='с-tv-show-details-card__companies-content'>
                                            <span className='text-lg font-semibold'>
                                                {company.name}
                                            </span>
                                            <span className='opacity-75 text-sm'>
                                                {company.origin_country}
                                            </span>
                                        </div>
                                    </li>
                                ))
                        }
                    </ul>
                </div>

                <div className='с-tv-show-details-card__overview'>
                    <p className='с-tv-show-details-card__overview-title'>
                        Overview:
                    </p>
                    <p className='с-tv-show-details-card__overview-text'>
                        {props.overview}
                    </p>
                </div>
            </Container>
        </div>
    );
};
