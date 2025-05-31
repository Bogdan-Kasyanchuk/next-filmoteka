import Image from 'next/image';
import { Fragment } from 'react';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { PARAMETERS, IMG_SIZES } from '@/helpers/parameters';
import { MovieDetailsMapper } from '@/types';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formateDate';

type Props = MovieDetailsMapper['movie']

export default function MovieDetails(props: Props) {
    const average = Math.round(props.vote_average * 10);

    return (
        <div>
            <div className='с-movie-details'>
                <div className='с-movie-details__backdrop'>
                    <Image
                        src={`${PARAMETERS.URL_IMG}${IMG_SIZES.MEDIA_CARD_DETAILS_BACKDROP}${props.backdrop_path}`}
                        sizes="(max-width: 767px) 768px, (max-width: 1319px) 1320px, 1920px"
                        alt={props.title}
                        fill
                    />
                </div>

                <Container className='с-movie-details__container'>
                    <div className='с-movie-details__cover'>
                        {
                            props.adult &&
                            <div className='с-movie-details__adult'>
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
                            alt={props.title}
                            fill
                        />
                    </div>

                    <Title className='с-movie-details__title'>
                        {props.title}&nbsp;({formatDate(props.release_date, 'YYYY')})
                    </Title>

                    <ul className='с-movie-details__list-rounds'>
                        <li
                            className='с-movie-details__list-rounds-item'
                            style={
                                {
                                    background: `conic-gradient(var(--color-success) ${average}%, 0, var(--color-primary) ${100 - average}%)`,
                                }
                            }
                        >
                            <div className='с-movie-details__list-rounds-item-inner'>
                                {average}
                                <span>%</span>
                            </div>
                        </li>

                        <li className='с-movie-details__list-rounds-item'>
                            {props.vote_count ?? 0}
                            <span>votes</span>
                        </li>

                        <li className='с-movie-details__list-rounds-item'>
                            {Math.round(props.popularity)}
                            <span>popularity</span>
                        </li>

                        <li className='с-movie-details__list-rounds-item'>
                            {props.runtime ?? 0}
                            <span>min</span>
                        </li>
                    </ul>

                    <ul className='с-movie-details__list-info'>
                        {
                            props.tagline &&
                            <li className='с-movie-details__list-info-item с-movie-details__list-info-item--tagline'>
                                &quot;{props.tagline}&quot;
                            </li>
                        }

                        {
                            props.imdb_id &&
                            <li className='с-movie-details__list-info-item с-movie-details__list-info-item--link'>
                                <span>IMDB:</span>
                                <a
                                    href={`https://www.imdb.com/title/${props.imdb_id}`}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    https://www.imdb.com/title/{props.imdb_id}
                                </a>
                            </li>
                        }

                        {
                            props.homepage &&
                            <li className='с-movie-details__list-info-item с-movie-details__list-info-item--link'>
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

                        <li className='с-movie-details__list-info-item'>
                            <span>Budget:</span>
                            <span>${formatCurrency(props.budget)}</span>
                        </li>

                        <li className='с-movie-details__list-info-item'>
                            <span>Revenue:</span>
                            <span>${formatCurrency(props.revenue)}</span>
                        </li>

                        <li className='с-movie-details__list-info-item'>
                            <span>Release:</span>
                            <span>{formatDate(props.release_date, 'DD.MM.YYYY')}</span>
                        </li>

                        <li className='с-movie-details__list-info-item'>
                            <span>Status:</span>
                            <span>{props.status}</span>
                        </li>

                        {
                            props.genres.length > 0 &&
                            <li className='с-movie-details__list-info-item'>
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

                        <li className='с-movie-details__list-info-item'>
                            <span>Original language:</span>
                            <span>{props.original_language}</span>
                        </li>

                        {
                            props.spoken_languages.length > 0 &&
                            <li className='с-movie-details__list-info-item'>
                                <span className='self-start'>Spoken languages:</span>
                                <span>
                                    {
                                        props.spoken_languages.map(
                                            (language, index) => (
                                                <Fragment key={index}>
                                                    {index !== 0 && <>&nbsp;|&nbsp;</>}
                                                    {language.english_name || language.name}
                                                </Fragment>
                                            ))
                                    }
                                </span>
                            </li>
                        }

                        {
                            props.origin_country.length > 0 &&
                            <li className='с-movie-details__list-info-item'>
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
                        <div className='с-movie-details__overview'>
                            <p className='с-movie-details__overview-title'>
                                Overview:
                            </p>
                            <p className='с-movie-details__overview-text'>
                                {props.overview}
                            </p>
                        </div>
                    }
                </Container>
            </div>

            {
                props.production_companies.length > 0 &&
                <Container className='xxl:max-w-[1440px] mt-[30px] text-primary'>
                    <div className='с-movie-details__companies'>
                        <p className='с-movie-details__companies-title'>
                            Production companies:
                        </p>
                        <ul className='с-movie-details__companies-list'>
                            {
                                props.production_companies.map(
                                    (company, index) => (
                                        <li
                                            key={index}
                                            className='с-movie-details__companies-item'
                                        >
                                            <div className='с-movie-details__companies-logo'>
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
                                            <div className='с-movie-details__companies-content'>
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
                </Container>
            }
        </div>
    );
};
