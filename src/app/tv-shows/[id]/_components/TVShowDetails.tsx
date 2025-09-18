import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { PARAMETERS, IMG_SIZES } from '@/helpers/parameters';
import { pagesTVUrl } from '@/routes';
import { TVShowDetailsMapper } from '@/types';
import { formatDate } from '@/utils/formateDate';

type Props = TVShowDetailsMapper['tvShow'] & { id: string };

export default function TVShowDetails(props: Props) {
    const average = Math.round(props.vote_average * 10);

    return (
        <>
            <div className='p-tv-show__details'>
                <div className='p-tv-show__details-backdrop'>
                    <Image
                        src={`${PARAMETERS.URL_IMG}${IMG_SIZES.MEDIA_CARD_DETAILS_BACKDROP}${props.backdrop_path}`}
                        sizes='(max-width: 767px) 768px, (max-width: 1319px) 1320px, 1920px'
                        alt={props.name}
                        fill
                    />
                </div>

                <Container className='p-tv-show__details-container sh'>
                    <div className='p-tv-show__details-cover'>
                        {
                            props.adult &&
                            <div className='p-tv-show__details-adult'>
                                18<span>+</span>
                            </div>
                        }

                        <Image
                            src={
                                props.poster_path
                                    ? `${PARAMETERS.URL_IMG}${IMG_SIZES.MEDIA_CARD_DETAILS_COVER}${props.poster_path}`
                                    : '/img/poster-not-available.jpg'
                            }
                            sizes='(max-width: 767px) 253px, (max-width: 1319px) 326px, 350px'
                            alt={props.name}
                            fill
                        />

                        <Link
                            href={`${pagesTVUrl()}/${props.id}/similar`}
                            className='p-tv-show__details-similar-button'
                        >
                            Similar
                        </Link>
                    </div>

                    <Title className='p-tv-show__details-title'>
                        {props.name}
                        {
                            props.first_air_date &&
                            <>&nbsp;({formatDate(props.first_air_date, 'YYYY')})</>
                        }
                    </Title>

                    <ul className='p-tv-show__details-list-rounds'>
                        <li
                            className='p-tv-show__details-list-rounds-item'
                            style={
                                {
                                    background: `conic-gradient(var(--color-success) ${average}%, 0, var(--color-primary) ${100 - average}%)`,
                                }
                            }
                        >
                            <div className='p-tv-show__details-list-rounds-item-inner'>
                                {average}
                                <span>%</span>
                            </div>
                        </li>

                        <li className='p-tv-show__details-list-rounds-item'>
                            {props.vote_count ?? 0}
                            <span>votes</span>
                        </li>

                        <li className='p-tv-show__details-list-rounds-item'>
                            {Math.round(props.popularity)}
                            <span>popularity</span>
                        </li>

                        <li className='p-tv-show__details-list-rounds-item'>
                            {props.number_of_seasons ?? 0}
                            <span>seasons</span>
                        </li>

                        <li className='p-tv-show__details-list-rounds-item'>
                            {props.number_of_episodes ?? 0}
                            <span>episodes</span>
                        </li>
                    </ul>

                    <ul className='p-tv-show__details-list-info'>
                        {
                            props.tagline &&
                            <li className='p-tv-show__details-list-info-item p-tv-show__details-list-info-item--tagline'>
                                &quot;{props.tagline}&quot;
                            </li>
                        }

                        {
                            props.homepage &&
                            <li className='p-tv-show__details-list-info-item p-tv-show__details-list-info-item--link'>
                                <span>WebSite:</span>
                                <a
                                    href={props.homepage}
                                    rel='noopener noreferrer'
                                    target='_blank'
                                >
                                    {props.homepage}
                                </a>
                            </li>
                        }

                        {
                            props.first_air_date &&
                            <li className='p-tv-show__details-list-info-item'>
                                <span>First air date:</span>
                                <span>{formatDate(props.first_air_date, 'DD.MM.YYYY')}</span>
                            </li>
                        }

                        {
                            props.last_air_date &&
                            <li className='p-tv-show__details-list-info-item'>
                                <span>Last air date:</span>
                                <span>{formatDate(props.last_air_date, 'DD.MM.YYYY')}</span>
                            </li>
                        }

                        <li className='p-tv-show__details-list-info-item'>
                            <span>In production:</span>
                            <span>{props.in_production ? 'Yes' : 'No'}</span>
                        </li>

                        <li className='p-tv-show__details-list-info-item'>
                            <span>Type:</span>
                            <span>{props.type}</span>
                        </li>

                        <li className='p-tv-show__details-list-info-item'>
                            <span>Status:</span>
                            <span>{props.status}</span>
                        </li>

                        {
                            props.genres.length > 0 &&
                            <li className='p-tv-show__details-list-info-item'>
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

                        <li className='p-tv-show__details-list-info-item'>
                            <span>Original language:</span>
                            <span>{props.original_language}</span>
                        </li>

                        {
                            props.spoken_languages.length > 0 &&
                            <li className='p-tv-show__details-list-info-item'>
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
                            <li className='p-tv-show__details-list-info-item'>
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
                        <div className='p-tv-show__details-overview'>
                            <p className='p-tv-show__details-overview-title'>
                                Overview:
                            </p>
                            <p className='p-tv-show__details-overview-text'>
                                {props.overview}
                            </p>
                        </div>
                    }
                </Container>
            </div>

            {
                (props.created_by.length > 0 || props.networks.length > 0 || props.production_companies.length > 0) &&
                <Container className='p-tv-show__details-content'>
                    {
                        props.created_by.length > 0 &&
                        <div className='p-tv-show__details-creators'>
                            <p className='p-tv-show__details-creators-title'>
                                Creators:
                            </p>
                            <ul className='p-tv-show__details-creators-list'>
                                {
                                    props.created_by.map(
                                        (creator, index) => (
                                            <li
                                                key={index}
                                                className='p-tv-show__details-creators-item'
                                            >
                                                <div className='p-tv-show__details-creators-logo'>
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
                                                <div className='p-tv-show__details-creators-content'>
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
                        <div className='p-tv-show__details-networks'>
                            <p className='p-tv-show__details-networks-title'>
                                Networks:
                            </p>
                            <ul className='p-tv-show__details-networks-list'>
                                {
                                    props.networks.map(
                                        (network, index) => (
                                            <li
                                                key={index}
                                                className='p-tv-show__details-networks-item'
                                            >
                                                <div className='p-tv-show__details-networks-logo'>
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
                                                <div className='p-tv-show__details-networks-content'>
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
                        <div className='p-tv-show__details-companies'>
                            <p className='p-tv-show__details-companies-title'>
                                Production companies:
                            </p>
                            <ul className='p-tv-show__details-companies-list'>
                                {
                                    props.production_companies.map(
                                        (company, index) => (
                                            <li
                                                key={index}
                                                className='p-tv-show__details-companies-item'
                                            >
                                                <div className='p-tv-show__details-companies-logo'>
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
                                                <div className='p-tv-show__details-companies-content'>
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
