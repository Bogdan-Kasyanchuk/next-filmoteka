import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { PARAMETERS, IMG_SIZES } from '@/helpers/parameters';
import { MovieDetailsMapper } from '@/types';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatDate } from '@/utils/formateDate';

type Props = MovieDetailsMapper['movie'] & { id: string }

export default function MovieDetails(props: Props) {
    const average = Math.round(props.vote_average * 10);

    return (
        <div>
            <div className='p-movie__details'>
                <div className='p-movie__details-backdrop'>
                    <Image
                        src={`${PARAMETERS.URL_IMG}${IMG_SIZES.MEDIA_CARD_DETAILS_BACKDROP}${props.backdrop_path}`}
                        sizes="(max-width: 767px) 768px, (max-width: 1319px) 1320px, 1920px"
                        alt={props.title}
                        fill
                    />
                </div>

                <Container className='p-movie__details-container'>
                    <div className='p-movie__details-cover'>
                        {
                            props.adult &&
                            <div className='p-movie__details-adult'>
                                18<span>+</span>
                            </div>
                        }

                        <Image
                            src={
                                props.poster_path
                                    ? `${PARAMETERS.URL_IMG}${IMG_SIZES.MEDIA_CARD_DETAILS_COVER}${props.poster_path}`
                                    : '/img/poster-not-available.jpg'
                            }
                            sizes="(max-width: 767px) 253px, (max-width: 1319px) 326px, 350px"
                            alt={props.title}
                            fill
                        />

                        <Link
                            href={`/movies/${props.id}/similar`}
                            className='p-movie__details-similar-button'
                        >
                            Similar
                        </Link>
                    </div>

                    <Title className='p-movie__details-title'>
                        {props.title}&nbsp;({formatDate(props.release_date, 'YYYY')})
                    </Title>

                    <ul className='p-movie__details-list-rounds'>
                        <li
                            className='p-movie__details-list-rounds-item'
                            style={
                                {
                                    background: `conic-gradient(var(--color-success) ${average}%, 0, var(--color-primary) ${100 - average}%)`,
                                }
                            }
                        >
                            <div className='p-movie__details-list-rounds-item-inner'>
                                {average}
                                <span>%</span>
                            </div>
                        </li>

                        <li className='p-movie__details-list-rounds-item'>
                            {props.vote_count ?? 0}
                            <span>votes</span>
                        </li>

                        <li className='p-movie__details-list-rounds-item'>
                            {Math.round(props.popularity)}
                            <span>popularity</span>
                        </li>

                        <li className='p-movie__details-list-rounds-item'>
                            {props.runtime ?? 0}
                            <span>min</span>
                        </li>
                    </ul>

                    <ul className='p-movie__details-list-info'>
                        {
                            props.tagline &&
                            <li className='p-movie__details-list-info-item p-movie__details-list-info-item--tagline'>
                                &quot;{props.tagline}&quot;
                            </li>
                        }

                        {
                            props.imdb_id &&
                            <li className='p-movie__details-list-info-item p-movie__details-list-info-item--link'>
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
                            <li className='p-movie__details-list-info-item p-movie__details-list-info-item--link'>
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

                        <li className='p-movie__details-list-info-item'>
                            <span>Budget:</span>
                            <span>${formatCurrency(props.budget)}</span>
                        </li>

                        <li className='p-movie__details-list-info-item'>
                            <span>Revenue:</span>
                            <span>${formatCurrency(props.revenue)}</span>
                        </li>

                        {
                            props.release_date &&
                            <li className='p-movie__details-list-info-item'>
                                <span>Release:</span>
                                <span>{formatDate(props.release_date, 'DD.MM.YYYY')}</span>
                            </li>
                        }

                        <li className='p-movie__details-list-info-item'>
                            <span>Status:</span>
                            <span>{props.status}</span>
                        </li>

                        {
                            props.genres.length > 0 &&
                            <li className='p-movie__details-list-info-item'>
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

                        <li className='p-movie__details-list-info-item'>
                            <span>Original language:</span>
                            <span>{props.original_language}</span>
                        </li>

                        {
                            props.spoken_languages.length > 0 &&
                            <li className='p-movie__details-list-info-item'>
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
                            <li className='p-movie__details-list-info-item'>
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
                        <div className='p-movie__details-overview'>
                            <p className='p-movie__details-overview-title'>
                                Overview:
                            </p>
                            <p className='p-movie__details-overview-text'>
                                {props.overview}
                            </p>
                        </div>
                    }
                </Container>
            </div>

            {
                props.production_companies.length > 0 &&
                <Container className='p-movie__details-content'>
                    <div className='p-movie__details-companies'>
                        <p className='p-movie__details-companies-title'>
                            Production companies:
                        </p>
                        <ul className='p-movie__details-companies-list'>
                            {
                                props.production_companies.map(
                                    (company, index) => (
                                        <li
                                            key={index}
                                            className='p-movie__details-companies-item'
                                        >
                                            <div className='p-movie__details-companies-logo'>
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
                                            <div className='p-movie__details-companies-content'>
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
