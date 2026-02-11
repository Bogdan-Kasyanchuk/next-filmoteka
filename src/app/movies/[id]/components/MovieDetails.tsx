import { ShowMore } from '@re-dev/react-truncate';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

import CompanyDetails from '@/components/app/CompanyDetails';
import Popover from '@/components/ui/data-display/Popover';
import SocialLinks from '@/components/ui/data-display/SocialLinks';
import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { IMG_SIZES, PLACEHOLDERS } from '@/datasets/constants';
import { MediaType } from '@/enums';
import { imageUrl, pagesSimilarUrl } from '@/routes';
import { MovieDetailsMapper } from '@/types';
import formatCurrency from '@/utils/formatCurrency';
import formatDate from '@/utils/formateDate';

type Props = {
    movie: MovieDetailsMapper['movie'],
    id: string
};

export default function MovieDetails(props: Props) {
    const average = Math.round((props.movie.vote_average ?? 0) * 10);

    return (
        <div>
            <div className="p-movie__details">
                <div className="p-movie__details-backdrop">
                    <Image
                        src={ imageUrl(IMG_SIZES.MEDIA_DETAILS_BACKDROP, props.movie.backdrop_path) }
                        sizes="(max-width: 767px) 768px, (max-width: 1319px) 1320px, 1920px"
                        alt={ props.movie.title }
                        fill
                        preload
                        loading="eager"
                    />
                </div>

                <Container className="p-movie__details-container">
                    <div className="p-movie__details-cover">
                        {
                            props.movie.adult &&
                            <div className="p-movie__details-adult">
                                18<span>+</span>
                            </div>
                        }

                        <Image
                            src={
                                props.movie.poster_path
                                    ? imageUrl(IMG_SIZES.MEDIA_DETAILS_COVER, props.movie.poster_path)
                                    : '/img/poster-not-available.jpg'
                            }
                            sizes="(max-width: 767px) 254px, (max-width: 1319px) 327px, 351px"
                            alt={ props.movie.title }
                            placeholder={ PLACEHOLDERS[ '2x3_large' ] }
                            fill
                            preload
                            loading="eager"
                        />

                        <Link
                            href={ pagesSimilarUrl(MediaType.MOVIE, props.id) }
                            className="p-movie__details-similar-button"
                        >
                            Similar movies
                        </Link>
                    </div>

                    <Title className="p-movie__details-title">
                        { props.movie.title }&nbsp;({ formatDate(props.movie.release_date, 'YYYY') })
                    </Title>

                    <ul className="p-movie__details-list-rounds">
                        <li
                            className="p-movie__details-list-rounds-item"
                            style={
                                {
                                    background: `conic-gradient(var(--color-success) ${ average }%, 0, var(--color-primary) ${ 100 - average }%)`
                                }
                            }
                        >
                            <div className="p-movie__details-list-rounds-item-inner">
                                { average }
                                <span>%</span>
                            </div>
                        </li>

                        <li className="p-movie__details-list-rounds-item">
                            { props.movie.vote_count ?? 0 }
                            <span>votes</span>
                        </li>

                        <li className="p-movie__details-list-rounds-item">
                            { Math.round(props.movie.popularity ?? 0) }
                            <span>popularity</span>
                        </li>

                        <li className="p-movie__details-list-rounds-item">
                            { props.movie.runtime ?? 0 }
                            <span>min</span>
                        </li>
                    </ul>

                    <ul className="p-movie__details-list-info">
                        {
                            props.movie.tagline &&
                            <li className="p-movie__details-list-info-item p-movie__details-list-info-item--tagline">
                                &quot;{ props.movie.tagline }&quot;
                            </li>
                        }

                        {
                            props.movie.homepage &&
                            <li className="p-movie__details-list-info-item p-movie__details-list-info-item--link">
                                <span>WebSite:</span>
                                <a
                                    href={ props.movie.homepage }
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    className="truncate u-link-color"
                                >
                                    { props.movie.homepage }
                                </a>
                            </li>
                        }

                        <li className="p-movie__details-list-info-item">
                            <span>Budget:</span>
                            <span>${ formatCurrency(props.movie.budget ?? 0) }</span>
                        </li>

                        <li className="p-movie__details-list-info-item">
                            <span>Revenue:</span>
                            <span>${ formatCurrency(props.movie.revenue ?? 0) }</span>
                        </li>

                        {
                            props.movie.release_date &&
                            <li className="p-movie__details-list-info-item">
                                <span>Release:</span>
                                <span>{ formatDate(props.movie.release_date, 'DD.MM.YYYY') }</span>
                            </li>
                        }

                        {
                            props.movie.genres.length > 0 &&
                            <li className="p-movie__details-list-info-item">
                                <span className="self-start">Genres:</span>
                                <span>
                                    {
                                        props.movie.genres.map(
                                            (genre, index) => (
                                                <Fragment key={ index }>
                                                    { index !== 0 && <>&nbsp;|&nbsp;</> }
                                                    { genre }
                                                </Fragment>
                                            ))
                                    }
                                </span>
                            </li>
                        }

                        {
                            props.movie.original_language &&
                            <li className="p-movie__details-list-info-item">
                                <span>Original language:</span>
                                <span>{ props.movie.original_language }</span>
                            </li>
                        }

                        {
                            props.movie.spoken_languages.length > 0 &&
                            <li className="p-movie__details-list-info-item">
                                <span className="self-start">Spoken languages:</span>
                                <span>
                                    {
                                        props.movie.spoken_languages.map(
                                            (language, index) => (
                                                <Fragment key={ index }>
                                                    { index !== 0 && <>&nbsp;|&nbsp;</> }
                                                    { language.english_name || language.name }
                                                </Fragment>
                                            ))
                                    }
                                </span>
                            </li>
                        }

                        {
                            props.movie.origin_country.length > 0 &&
                            <li className="p-movie__details-list-info-item">
                                <span className="self-start">Countries:</span>
                                <span>
                                    {
                                        props.movie.origin_country.map(
                                            (country, index) => (
                                                <Fragment key={ index }>
                                                    { index !== 0 && <>&nbsp;|&nbsp;</> }
                                                    { country }
                                                </Fragment>
                                            ))
                                    }
                                </span>
                            </li>
                        }
                    </ul>

                    {
                        props.movie.socialLinks.length > 0 &&
                        <SocialLinks socials={ props.movie.socialLinks } />
                    }

                    {
                        props.movie.overview &&
                        <div className="p-movie__details-overview">
                            <p className="p-movie__details-overview-title">
                                Overview:
                            </p>

                            <ShowMore
                                className="p-movie__details-overview-text"
                                lines={ 5 }
                            >
                                { props.movie.overview }
                            </ShowMore>
                        </div>
                    }
                </Container>
            </div>

            {
                props.movie.production_companies.length > 0 &&
                <Container className="p-movie__details-content">
                    <div className="p-movie__details-companies">
                        <p className="p-movie__details-companies-title">
                            Production companies:
                        </p>

                        <ul className="p-movie__details-companies-list">
                            {
                                props.movie.production_companies.map(
                                    (company, index) => (
                                        <li
                                            key={ index }
                                            className="p-movie__details-companies-item"
                                        >
                                            <div className="p-movie__details-companies-logo">
                                                <Image
                                                    src={
                                                        company.logo_path
                                                            ? imageUrl(IMG_SIZES.COMPANY_LOGO, company.logo_path)
                                                            : '/img/image-placeholder.svg'
                                                    }
                                                    fill
                                                    sizes="50px"
                                                    alt={ company.name }
                                                />
                                            </div>
                                                    
                                            <div className="p-movie__details-companies-content">
                                                <div className="text-lg font-semibold">
                                                    { company.name }

                                                    <Popover
                                                        trigger={
                                                            <button
                                                                type="button"
                                                                className="p-movie__details-companies-trigger"
                                                            >
                                                                i
                                                            </button>
                                                        }
                                                        classNames={
                                                            {
                                                                content: 'p-movie__details-companies-details'
                                                            }
                                                        }
                                                        isArrow
                                                    >
                                                        <CompanyDetails id={ company.id } /> 
                                                    </Popover>
                                                </div>
                                                    
                                                {
                                                    company.origin_country &&
                                                    <span className="opacity-75 text-sm">
                                                        { company.origin_country }
                                                    </span>
                                                }
                                            </div>
                                        </li>
                                    )
                                )
                            }
                        </ul>
                    </div>
                </Container>
            }
        </div>
    );
}