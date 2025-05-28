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

    const originalLanguage = props.spoken_languages.find(
        (language) => language.iso_639_1 === props.original_language
    );

    return (
        <div className='с-movie-details-card'>
            <div className='с-movie-details-card__backdrop'>
                <Image
                    src={`${PARAMETERS.URL_IMG}/${IMG_SIZES.MEDIA_CARD_DETAILS_BACKDROP}/${props.backdrop_path}`}
                    sizes="(max-width: 767px) 768px, (max-width: 1319px) 1320px, 1920px"
                    alt={props.title}
                    fill
                />
            </div>

            <Container className='с-movie-details-card__container'>
                <div className='с-movie-details-card__cover'>
                    {
                        props.adult &&
                        <div className='с-movie-details-card__tag'>
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
                        alt={props.title}
                        fill
                    />
                </div>

                <Title className='с-movie-details-card__title'>
                    {props.title}&nbsp;({formatDate(props.release_date, 'YYYY')})
                </Title>

                <ul className='с-movie-details-card__list-rounds'>
                    <li className='с-movie-details-card__list-rounds-item'>
                        {(props.vote_average / 10 * 100).toFixed(0)}
                        <span>%</span>
                    </li>

                    <li className='с-movie-details-card__list-rounds-item'>
                        {props.vote_count}
                        <span>votes</span>
                    </li>

                    <li className='с-movie-details-card__list-rounds-item'>
                        {props.popularity.toFixed(0)}
                        <span>popularity</span>
                    </li>

                    <li className='с-movie-details-card__list-rounds-item'>
                        {props.runtime}
                        <span>min</span>
                    </li>
                </ul>

                <ul className='с-movie-details-card__list-info'>
                    <li className='с-movie-details-card__list-info-item с-movie-details-card__list-info-item--tagline'>
                        &quot;{props.tagline}&quot;
                    </li>
                    <li className='с-movie-details-card__list-info-item с-movie-details-card__list-info-item--link'>
                        <span>IMDB:</span>
                        <a
                            href={`https://www.imdb.com/title/${props.imdb_id}`}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            https://www.imdb.com/title/{props.imdb_id}
                        </a>
                    </li>

                    <li className='с-movie-details-card__list-info-item с-movie-details-card__list-info-item--link'>
                        <span>WebSite:</span>
                        <a
                            href={props.homepage}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            {props.homepage}
                        </a>
                    </li>

                    <li className='с-movie-details-card__list-info-item'>
                        <span>Budget:</span>
                        <span>${formatCurrency(props.budget)}</span>
                    </li>

                    <li className='с-movie-details-card__list-info-item'>
                        <span>Revenue:</span>
                        <span>${formatCurrency(props.revenue)}</span>
                    </li>

                    <li className='с-movie-details-card__list-info-item'>
                        <span>Release:</span>
                        <span>{formatDate(props.release_date, 'DD.MM.YYYY')}</span>
                    </li>

                    <li className='с-movie-details-card__list-info-item'>
                        <span>Status:</span>
                        <span>{props.status}</span>
                    </li>

                    <li className='с-movie-details-card__list-info-item'>
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

                    <li className='с-movie-details-card__list-info-item'>
                        <span>Original language:</span>
                        <span>
                            {originalLanguage?.name || originalLanguage?.english_name}
                        </span>
                    </li>

                    <li className='с-movie-details-card__list-info-item'>
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

                    <li className='с-movie-details-card__list-info-item'>
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

                <div className='с-movie-details-card__companies'>
                    <p className='с-movie-details-card__companies-title'>
                        Production companies:
                    </p>
                    <ul className='с-movie-details-card__companies-list'>
                        {
                            props.production_companies.map(
                                (company, index) => (
                                    <li
                                        key={index}
                                        className='с-movie-details-card__companies-item'
                                    >
                                        <div className='с-movie-details-card__companies-logo'>
                                            <Image
                                                src={
                                                    company.logo_path
                                                        ? `${PARAMETERS.URL_IMG}/${IMG_SIZES.COMPANY_LOGO}/${company.logo_path}`
                                                        : '/img/poster-not-available.jpg'
                                                }
                                                fill
                                                sizes='60px'
                                                alt={company.name}
                                            />
                                        </div>
                                        <div className='с-movie-details-card__companies-content'>
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

                <div className='с-movie-details-card__overview'>
                    <p className='с-movie-details-card__overview-title'>
                        Overview:
                    </p>
                    <p className='с-movie-details-card__overview-text'>
                        {props.overview}
                    </p>
                </div>
            </Container>
        </div>
    );
};
