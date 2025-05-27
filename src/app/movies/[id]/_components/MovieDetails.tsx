import clsx from 'clsx';
import Image from 'next/image';
import { Fragment } from 'react';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { PARAMETERS, IMG_SIZES } from '@/helpers/parameters';
import { MovieDetailsMapper } from '@/types';
import { formatDate } from '@/utils/formateDate';

type Props = MovieDetailsMapper['movie']

export default function MovieDetails(props: Props) {

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
                    <li
                        className={
                            clsx('с-movie-details-card__list-rounds-item', {
                                'text-danger': props.adult
                            })
                        }
                    >
                        {props.adult ? '18' : '0'}
                        <span>+</span>
                    </li>

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

                <ul className='с-movie-details-card__list'>
                    <li className='с-movie-details-card__item'>
                        &quot;{props.tagline}&quot;
                    </li>

                    <li className='с-movie-details-card__item'>
                        IMDB: <span>https://www.imdb.com/title/{props.imdb_id}</span>
                    </li>

                    <li className='с-movie-details-card__item'>
                        Url: <span>{props.homepage}</span>
                    </li>

                    <li className='с-movie-details-card__item'>
                        Budget: <span>{props.budget} $</span>
                    </li>

                    <li className='с-movie-details-card__item'>
                        Revenue: <span>{props.revenue} $</span>
                    </li>

                    <li className='с-movie-details-card__item'>
                        Release: <span>{formatDate(props.release_date, 'DD.MM.YYYY')}</span>
                    </li>

                    <li className='с-movie-details-card__item'>
                        Status: <span>{props.status}</span>
                    </li>

                    <li className='с-movie-details-card__item'>
                        Original language: <span>{props.original_language}</span>
                    </li>
                </ul>

                {/* <div className={'movie-card-details-genres'}>
                        <h3 className={'movie-card-details-genres-title'}>Genres:</h3>
                        <ul className={'movie-card-details-genres-list'}>
                            {
                                props.genres.map(
                                    (genre, index) => (
                                        <li
                                            className={'movie-card-details-genres-item'}
                                            key={index}
                                        >
                                            {genre}
                                        </li>
                                    ))
                            }
                        </ul>
                    </div>

                    <div className={'movie-card-details-genres'}>
                        <h3 className={'movie-card-details-genres-title'}>Countries:</h3>
                        <ul className={'movie-card-details-genres-list'}>
                            {
                                props.origin_country.map(
                                    (country, index) => (
                                        <li
                                            className={'movie-card-details-genres-item'}
                                            key={index}
                                        >
                                            {country}
                                        </li>
                                    ))
                            }
                        </ul>
                    </div>

                    <div className={'movie-card-details-genres'}>
                        <h3 className={'movie-card-details-genres-title'}>Spoken languages:</h3>
                        <ul className={'movie-card-details-genres-list'}>
                            {
                                props.spoken_languages.map(
                                    (language, index) => (
                                        <li
                                            className={'movie-card-details-genres-item'}
                                            key={index}
                                        >
                                            {language.name} - {language.english_name}
                                        </li>
                                    ))
                            }
                        </ul>
                    </div>

                    <div className={'movie-card-details-companies'}>
                        <h3 className={'movie-card-details-companies-title'}>
                            Production companies:
                        </h3>
                        <ul className={'movie-card-details-companies-list'}>
                            {
                                props.production_companies.map(
                                    (company, index) => (
                                        <li
                                            className={'flex items-center gap-2'}
                                            key={index}
                                        >
                                            <Image
                                                src={
                                                    company.logo_path
                                                        ? `${PARAMETERS.URL_IMG}/${IMG_SIZES.COMPANY_LOGO}/${company.logo_path}`
                                                        : '/img/poster-not-available.jpg'
                                                }
                                                width={60}
                                                height={60}
                                                alt={company.name}
                                                className='rounded-xs w-15 h-15 object-cover'

                                            />
                                            <div className={'flex gap-2 flex-col'}>
                                                <span>{company.name}</span>
                                                <span>{company.origin_country}</span>
                                            </div>
                                        </li>
                                    ))
                            }
                        </ul>
                    </div>

                    <div className={'movie-card-details-overview'}>
                        <h3 className={'movie-card-details-overview-title'}>
                            Overview:
                        </h3>
                        <p className={'movie-card-details-overview-text'}>
                            {props.overview}
                        </p>
                    </div> */}
            </Container>
        </div>
    );
};
