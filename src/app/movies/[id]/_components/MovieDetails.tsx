import Image from 'next/image';
import { Fragment } from 'react';

import Container from '@/components/ui/layouts/Container';
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

                <div className='с-movie-details-card__content'>
                    <div className='flex flex-col gap-2.5'>
                        <span>
                            {props.imdb_id}
                        </span>
                        <span>
                            {props.adult ? '18+' : '0+'}
                        </span>
                        <span>
                            {props.homepage}
                        </span>
                        <span>
                            {props.budget}
                        </span>
                        <span>
                            {props.title}
                        </span>
                        <span>
                            {props.overview}
                        </span>
                        <span>
                            {props.status}
                        </span>
                        <span>
                            {props.tagline}
                        </span>
                        <span>
                            {props.vote_average}
                        </span>
                        <span>
                            {props.vote_count}
                        </span>
                        <span>
                            {props.popularity}
                        </span>
                        <span>
                            {props.original_language}
                        </span>
                        <span>
                            {formatDate(props.release_date, 'YYYY')}
                        </span>
                        <span>
                            {props.revenue}
                        </span>
                        <span>
                            {props.runtime}
                        </span>
                        <span>
                            {props.status}
                        </span>
                        <span>
                            {
                                props.genres.map(
                                    (item, index) => (
                                        <span key={index}>
                                            {item}
                                        </span>
                                    ))
                            }
                        </span>
                        <span>
                            {
                                props.origin_country.map(
                                    (item, index) => (
                                        <span key={index}>
                                            {item}
                                        </span>
                                    ))
                            }
                        </span>
                        <span>
                            {
                                props.production_companies.map(
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
                                props.spoken_languages.map(
                                    (item, index) => (
                                        <span key={index}>
                                            {item.name}-{item.english_name}
                                        </span>
                                    ))
                            }
                        </span>

                    </div>

                    {/* <h2 className={'movie-card-details-title'}>
                            {props.title} ({props.release_date})
                        </h2>
                        <ul className={'movie-card-details-list'}>
                            <li className={'movie-card-details-item'}>
                                Vote count: <span>{props.vote_count}</span>
                            </li>
                            <li className={'movie-card-details-item'}>
                                Vote average: <span>{props.vote_average}</span>
                            </li>
                            <li className={'movie-card-details-item'}>
                                Popularity: <span>{props.popularity.toFixed(1)}</span>
                            </li>
                        </ul>
                        <div className={'movie-card-details-overview'}>
                            <h3 className={'movie-card-details-overview-title'}>
                                Overview:
                            </h3>
                            <p className={'movie-card-details-overview-text'}>
                                {props.overview}
                            </p>
                        </div>
                        <div className={'movie-card-details-genres'}>
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
                        <div className={'movie-card-details-companies'}>
                            <h3 className={'movie-card-details-companies-title'}>
                                Production companies:
                            </h3>
                            <ul className={'movie-card-details-companies-list'}>
                                {
                                    props.production_companies.map(
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
