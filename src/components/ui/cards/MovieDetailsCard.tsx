import Image from 'next/image';
import { Fragment } from 'react';

import { PARAMETERS, IMG_SIZES } from '@/helpers/parameters';
import { MovieDetailsMapper } from '@/types';

import Container from '../layouts/Container';

type Props = {
    movie: MovieDetailsMapper
}

export default function MovieDetailsCard(props: Props) {
    return (
        <div className='с-movie-details-card'>
            <div className='с-movie-details-card__backdrop'>
                <Image
                    src={`${PARAMETERS.URL_IMG}/${IMG_SIZES.CARD_DETAILS_BACKDROP}/${props.movie.backdrop_path}`}
                    sizes="(max-width: 767px) 768px, (max-width: 1319px) 1320px, 1920px"
                    alt={props.movie.title}
                    fill
                />
            </div>

            <Container className='с-movie-details-card__container'>
                <div className='с-movie-details-card__cover'>
                    <Image
                        src={
                            props.movie.poster_path
                                ? `${PARAMETERS.URL_IMG}/${IMG_SIZES.CARD_DETAILS_COVER}/${props.movie.poster_path}`
                                : '/img/poster-not-available.jpg'
                        }
                        sizes="500px"
                        alt={props.movie.title}
                        fill
                    />
                </div>

                <div className='с-movie-details-card__content'>
                    <div className='flex flex-col gap-2.5'>
                        <span>
                            {props.movie.imdb_id}
                        </span>
                        <span>
                            {props.movie.adult ? '18+' : '0+'}
                        </span>
                        <span>
                            {props.movie.homepage}
                        </span>
                        <span>
                            {props.movie.budget}
                        </span>
                        <span>
                            {props.movie.title}
                        </span>
                        <span>
                            {props.movie.overview}
                        </span>
                        <span>
                            {props.movie.status}
                        </span>
                        <span>
                            {props.movie.tagline}
                        </span>
                        <span>
                            {props.movie.vote_average}
                        </span>
                        <span>
                            {props.movie.vote_count}
                        </span>
                        <span>
                            {props.movie.popularity}
                        </span>
                        <span>
                            {props.movie.original_language}
                        </span>
                        <span>
                            {props.movie.release_date}
                        </span>
                        <span>
                            {props.movie.revenue}
                        </span>
                        <span>
                            {props.movie.runtime}
                        </span>
                        <span>
                            {props.movie.status}
                        </span>
                        <span>
                            {
                                props.movie.genres.map(
                                    (item, index) => (
                                        <span key={index}>
                                            {item}
                                        </span>
                                    ))
                            }
                        </span>
                        <span>
                            {
                                props.movie.origin_country.map(
                                    (item, index) => (
                                        <span key={index}>
                                            {item}
                                        </span>
                                    ))
                            }
                        </span>
                        <span>
                            {
                                props.movie.production_companies.map(
                                    (item, index) => (
                                        <Fragment key={index}>
                                            <span>
                                                {item.name}-{item.origin_country}
                                            </span>
                                            <br />
                                        </Fragment>
                                    ))
                            }
                        </span>
                        <span>
                            {
                                props.movie.spoken_languages.map(
                                    (item, index) => (
                                        <span key={index}>
                                            {item.name}-{item.english_name}
                                        </span>
                                    ))
                            }
                        </span>

                    </div>

                    {/* <h2 className={'movie-card-details-title'}>
                            {props.movie.title} ({props.movie.release_date})
                        </h2>
                        <ul className={'movie-card-details-list'}>
                            <li className={'movie-card-details-item'}>
                                Vote count: <span>{props.movie.vote_count}</span>
                            </li>
                            <li className={'movie-card-details-item'}>
                                Vote average: <span>{props.movie.vote_average}</span>
                            </li>
                            <li className={'movie-card-details-item'}>
                                Popularity: <span>{props.movie.popularity.toFixed(1)}</span>
                            </li>
                        </ul>
                        <div className={'movie-card-details-overview'}>
                            <h3 className={'movie-card-details-overview-title'}>
                                Overview:
                            </h3>
                            <p className={'movie-card-details-overview-text'}>
                                {props.movie.overview}
                            </p>
                        </div>
                        <div className={'movie-card-details-genres'}>
                            <h3 className={'movie-card-details-genres-title'}>Genres:</h3>
                            <ul className={'movie-card-details-genres-list'}>
                                {
                                    props.movie.genres.map(
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
                        <div className={'movie-card-details-companies'}>
                            <h3 className={'movie-card-details-companies-title'}>
                                Production companies:
                            </h3>
                            <ul className={'movie-card-details-companies-list'}>
                                {
                                    props.movie.production_companies.map(
                                        (company, index) => (
                                            <li
                                                className={'movie-card-details-companies-item'}
                                                key={index}
                                            >
                                                {company.name}
                                            </li>
                                        ))
                                }
                            </ul>
                        </div> */}
                    {/* <div className={'movie-card-details-countries'}>
                    <h3 className={'movie-card-details-countries-title'}>
                        Production countries:
                    </h3>
                    <ul className={'movie-card-details-countries-list'}>
                        {
                            production_countries.map(element => (
                                <li
                                    className={'movie-card-details-countries-item'}
                                    key={element.name}
                                >
                                    {element.name}
                                </li>
                            ))
                        }
                    </ul>
                </div> */}
                </div>
            </Container>
        </div>
    );
};
