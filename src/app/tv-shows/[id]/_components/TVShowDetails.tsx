import Image from 'next/image';
import { Fragment } from 'react';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { PARAMETERS, IMG_SIZES } from '@/helpers/parameters';
import { TVShowDetailsMapper } from '@/types';
import { formatDate } from '@/utils/formateDate';

type Props = TVShowDetailsMapper['tvShow'];

export default function TVShowDetails(props: Props) {
    const average = Math.round(props.vote_average * 10);

    return (
        <>
            <div className='с-tv-show-details'>
                <div className='с-tv-show-details__backdrop'>
                    <Image
                        src={`${PARAMETERS.URL_IMG}${IMG_SIZES.MEDIA_CARD_DETAILS_BACKDROP}${props.backdrop_path}`}
                        sizes="(max-width: 767px) 768px, (max-width: 1319px) 1320px, 1920px"
                        alt={props.name}
                        fill
                    />
                </div>

                <Container className='с-tv-show-details__container sh'>
                    <div className='с-tv-show-details__cover'>
                        {
                            props.adult &&
                            <div className='с-tv-show-details__adult'>
                                18<span>+</span>
                            </div>
                        }

                        <Image
                            src={
                                props.poster_path
                                    ? `${PARAMETERS.URL_IMG}${IMG_SIZES.MEDIA_CARD_DETAILS_COVER}${props.poster_path}`
                                    : '/img/poster-not-available.jpg'
                            }
                            sizes="400px"
                            alt={props.name}
                            fill
                        />
                    </div>

                    <Title className='с-tv-show-details__title'>
                        {props.name}&nbsp;({formatDate(props.first_air_date, 'YYYY')})
                    </Title>

                    <ul className='с-tv-show-details__list-rounds'>
                        <li
                            className='с-tv-show-details__list-rounds-item'
                            style={
                                {
                                    background: `conic-gradient(var(--color-success) ${average}%, 0, var(--color-primary) ${100 - average}%)`,
                                }
                            }
                        >
                            <div className='с-tv-show-details__list-rounds-item-inner'>
                                {average}
                                <span>%</span>
                            </div>
                        </li>

                        <li className='с-tv-show-details__list-rounds-item'>
                            {props.vote_count ?? 0}
                            <span>votes</span>
                        </li>

                        <li className='с-tv-show-details__list-rounds-item'>
                            {Math.round(props.popularity)}
                            <span>popularity</span>
                        </li>

                        <li className='с-tv-show-details__list-rounds-item'>
                            {props.number_of_seasons ?? 0}
                            <span>seasons</span>
                        </li>

                        <li className='с-tv-show-details__list-rounds-item'>
                            {props.number_of_episodes ?? 0}
                            <span>episodes</span>
                        </li>
                    </ul>

                    <ul className='с-tv-show-details__list-info'>
                        {
                            props.tagline &&
                            <li className='с-tv-show-details__list-info-item с-tv-show-details__list-info-item--tagline'>
                                &quot;{props.tagline}&quot;
                            </li>
                        }

                        {
                            props.homepage &&
                            <li className='с-tv-show-details__list-info-item с-tv-show-details__list-info-item--link'>
                                <span>WebSite:</span>
                                <a
                                    href={props.homepage}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    {props.homepage}
                                </a>
                            </li>
                        }

                        <li className='с-tv-show-details__list-info-item'>
                            <span>First air date:</span>
                            <span>{formatDate(props.first_air_date, 'DD.MM.YYYY')}</span>
                        </li>

                        <li className='с-tv-show-details__list-info-item'>
                            <span>Last air date:</span>
                            <span>{formatDate(props.last_air_date, 'DD.MM.YYYY')}</span>
                        </li>

                        <li className='с-tv-show-details__list-info-item'>
                            <span>In production:</span>
                            <span>{props.in_production ? 'Yes' : 'No'}</span>
                        </li>

                        <li className='с-tv-show-details__list-info-item'>
                            <span>Type:</span>
                            <span>{props.type}</span>
                        </li>

                        <li className='с-tv-show-details__list-info-item'>
                            <span>Status:</span>
                            <span>{props.status}</span>
                        </li>

                        {
                            props.genres.length > 0 &&
                            <li className='с-tv-show-details__list-info-item'>
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
                        }

                        <li className='с-tv-show-details__list-info-item'>
                            <span>Original language:</span>
                            <span>{props.original_language}</span>
                        </li>

                        {
                            props.spoken_languages.length > 0 &&
                            <li className='с-tv-show-details__list-info-item'>
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
                        }

                        {
                            props.origin_country.length > 0 &&
                            <li className='с-tv-show-details__list-info-item'>
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
                        }
                    </ul>

                    {
                        props.overview &&
                        <div className='с-tv-show-details__overview'>
                            <p className='с-tv-show-details__overview-title'>
                                Overview:
                            </p>
                            <p className='с-tv-show-details__overview-text'>
                                {props.overview}
                            </p>
                        </div>
                    }
                </Container>
            </div>

            {
                (props.created_by.length > 0 || props.networks.length > 0 || props.production_companies.length > 0) &&
                <Container className='xxl:max-w-[1440px] flex flex-col gap-y-[30px] text-primary'>
                    {
                        props.created_by.length > 0 &&
                        <div className='с-tv-show-details__creators'>
                            <p className='с-tv-show-details__creators-title'>
                                Creators:
                            </p>
                            <ul className='с-tv-show-details__creators-list'>
                                {
                                    props.created_by.map(
                                        (creator, index) => (
                                            <li
                                                key={index}
                                                className='с-tv-show-details__creators-item'
                                            >
                                                <div className='с-tv-show-details__creators-logo'>
                                                    <Image
                                                        src={
                                                            creator.profile_path
                                                                ? `${PARAMETERS.URL_IMG}${IMG_SIZES.CREATOR_AVATAR}${creator.profile_path}`
                                                                : '/img/avatar-placeholder.svg'
                                                        }
                                                        fill
                                                        sizes='50px'
                                                        alt={creator.name}
                                                    />
                                                </div>
                                                <div className='с-tv-show-details__creators-content'>
                                                    {creator.name}
                                                </div>
                                            </li>
                                        ))
                                }
                            </ul>
                        </div>
                    }

                    {
                        props.networks.length > 0 &&
                        <div className='с-tv-show-details__networks'>
                            <p className='с-tv-show-details__networks-title'>
                                Networks:
                            </p>
                            <ul className='с-tv-show-details__networks-list'>
                                {
                                    props.networks.map(
                                        (network, index) => (
                                            <li
                                                key={index}
                                                className='с-tv-show-details__networks-item'
                                            >
                                                <div className='с-tv-show-details__networks-logo'>
                                                    <Image
                                                        src={
                                                            network.logo_path
                                                                ? `${PARAMETERS.URL_IMG}${IMG_SIZES.NETWORK_LOGO}${network.logo_path}`
                                                                : '/img/image-placeholder.svg'
                                                        }
                                                        fill
                                                        sizes='50px'
                                                        alt={network.name}
                                                    />
                                                </div>
                                                <div className='с-tv-show-details__networks-content'>
                                                    <span className='text-lg font-semibold'>
                                                        {network.name}
                                                    </span>
                                                    {
                                                        network.origin_country &&
                                                        <span className='opacity-75 text-sm'>
                                                            {network.origin_country}
                                                        </span>
                                                    }
                                                </div>
                                            </li>
                                        ))
                                }
                            </ul>
                        </div>
                    }

                    {
                        props.production_companies.length > 0 &&
                        <div className='с-tv-show-details__companies'>
                            <p className='с-tv-show-details__companies-title'>
                                Production companies:
                            </p>
                            <ul className='с-tv-show-details__companies-list'>
                                {
                                    props.production_companies.map(
                                        (company, index) => (
                                            <li
                                                key={index}
                                                className='с-tv-show-details__companies-item'
                                            >
                                                <div className='с-tv-show-details__companies-logo'>
                                                    <Image
                                                        src={
                                                            company.logo_path
                                                                ? `${PARAMETERS.URL_IMG}${IMG_SIZES.COMPANY_LOGO}${company.logo_path}`
                                                                : '/img/image-placeholder.svg'
                                                        }
                                                        fill
                                                        sizes='50px'
                                                        alt={company.name}
                                                    />
                                                </div>
                                                <div className='с-tv-show-details__companies-content'>
                                                    <span className='text-lg font-semibold'>
                                                        {company.name}
                                                    </span>
                                                    {
                                                        company.origin_country &&
                                                        <span className='opacity-75 text-sm'>
                                                            {company.origin_country}
                                                        </span>
                                                    }
                                                </div>
                                            </li>
                                        ))
                                }
                            </ul>
                        </div>
                    }
                </Container>
            }
        </>
    );
};
