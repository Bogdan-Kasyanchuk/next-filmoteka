import { ShowMore } from '@re-dev/react-truncate';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

import CompanyDetails from '@/components/app/CompanyDetails';
import Popover from '@/components/ui/data-display/Popover';
import SocialLinks from '@/components/ui/data-display/SocialLinks';
import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { IMG_SIZES } from '@/datasets/constants';
import { MediaType } from '@/enums';
import { imageUrl, pagesPersonUrl, pagesSimilarUrl } from '@/routes';
import { TVShowDetailsMapper } from '@/types';
import formatDate from '@/utils/formateDate';

import NetworkDetails from './NetworkDetails';

type Props = {
    tvShow: TVShowDetailsMapper['tvShow'],
    id: string
};

export default function TVShowDetails(props: Props) {
    const average = Math.round((props.tvShow.vote_average ?? 0) * 10);

    return (
        <div>
            <div className="p-tv-show__details">
                <div className="p-tv-show__details-backdrop">
                    <Image
                        src={ imageUrl(IMG_SIZES.MEDIA_DETAILS_BACKDROP, props.tvShow.backdrop_path) }
                        sizes="(max-width: 767px) 768px, (max-width: 1319px) 1320px, 1920px"
                        alt={ props.tvShow.name }
                        fill
                        fetchPriority="high"
                    />
                </div>

                <Container className="p-tv-show__details-container sh">
                    <div className="p-tv-show__details-cover">
                        {
                            props.tvShow.adult &&
                            <div className="p-tv-show__details-adult">
                                18<span>+</span>
                            </div>
                        }

                        <Image
                            src={
                                props.tvShow.poster_path
                                    ? imageUrl(IMG_SIZES.MEDIA_DETAILS_COVER, props.tvShow.poster_path)
                                    : '/img/poster-not-available.jpg'
                            }
                            sizes="(max-width: 767px) 254px, (max-width: 1319px) 327px, 351px"
                            alt={ props.tvShow.name }
                            fill
                            fetchPriority="high"
                        />

                        <Link
                            href={ pagesSimilarUrl(MediaType.TV_SHOW, props.id) }
                            className="p-tv-show__details-similar-button"
                        >
                            Similar tv shows
                        </Link>
                    </div>

                    <Title className="p-tv-show__details-title">
                        { props.tvShow.name }
                        {
                            props.tvShow.first_air_date &&
                            <>&nbsp;({ formatDate(props.tvShow.first_air_date, 'YYYY') })</>
                        }
                    </Title>

                    <ul className="p-tv-show__details-list-rounds">
                        <li
                            className="p-tv-show__details-list-rounds-item"
                            style={
                                {
                                    background: `conic-gradient(var(--color-success) ${ average }%, 0, var(--color-primary) ${ 100 - average }%)`
                                }
                            }
                        >
                            <div className="p-tv-show__details-list-rounds-item-inner">
                                { average }
                                <span>%</span>
                            </div>
                        </li>

                        <li className="p-tv-show__details-list-rounds-item">
                            { props.tvShow.vote_count ?? 0 }
                            <span>votes</span>
                        </li>

                        <li className="p-tv-show__details-list-rounds-item">
                            { Math.round(props.tvShow.popularity ?? 0) }
                            <span>popularity</span>
                        </li>

                        <li className="p-tv-show__details-list-rounds-item">
                            { props.tvShow.number_of_seasons ?? 0 }
                            <span>seasons</span>
                        </li>

                        <li className="p-tv-show__details-list-rounds-item">
                            { props.tvShow.number_of_episodes ?? 0 }
                            <span>episodes</span>
                        </li>
                    </ul>

                    <ul className="p-tv-show__details-list-info">
                        {
                            props.tvShow.tagline &&
                            <li className="p-tv-show__details-list-info-item p-tv-show__details-list-info-item--tagline">
                                &quot;{ props.tvShow.tagline }&quot;
                            </li>
                        }

                        {
                            props.tvShow.homepage &&
                            <li className="p-tv-show__details-list-info-item p-tv-show__details-list-info-item--link">
                                <span>WebSite:</span>
                                <a
                                    href={ props.tvShow.homepage }
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    className="truncate u-link-color"
                                >
                                    { props.tvShow.homepage }
                                </a>
                            </li>
                        }

                        {
                            props.tvShow.first_air_date &&
                            <li className="p-tv-show__details-list-info-item">
                                <span>First air date:</span>
                                <span>{ formatDate(props.tvShow.first_air_date, 'DD.MM.YYYY') }</span>
                            </li>
                        }

                        {
                            props.tvShow.last_air_date &&
                            <li className="p-tv-show__details-list-info-item">
                                <span>Last air date:</span>
                                <span>{ formatDate(props.tvShow.last_air_date, 'DD.MM.YYYY') }</span>
                            </li>
                        }

                        <li className="p-tv-show__details-list-info-item">
                            <span>Type:</span>
                            <span>{ props.tvShow.type }</span>
                        </li>

                        {
                            props.tvShow.genres.length > 0 &&
                            <li className="p-tv-show__details-list-info-item">
                                <span className="self-start">Genres:</span>
                                <span>
                                    {
                                        props.tvShow.genres.map(
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

                        <li className="p-tv-show__details-list-info-item">
                            <span>Original language:</span>
                            <span>{ props.tvShow.original_language }</span>
                        </li>

                        {
                            props.tvShow.spoken_languages.length > 0 &&
                            <li className="p-tv-show__details-list-info-item">
                                <span className="self-start">Spoken languages:</span>
                                <span>
                                    {
                                        props.tvShow.spoken_languages.map(
                                            (language, index) => (
                                                <Fragment key={ index }>
                                                    { index !== 0 && <>&nbsp;|&nbsp;</> }
                                                    { language.name || language.english_name }
                                                </Fragment>
                                            ))
                                    }
                                </span>
                            </li>
                        }

                        {
                            props.tvShow.origin_country.length > 0 &&
                            <li className="p-tv-show__details-list-info-item">
                                <span className="self-start">Countries:</span>
                                <span>
                                    {
                                        props.tvShow.origin_country.map(
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
                        props.tvShow.socialLinks.length > 0 &&
                        <SocialLinks socials={ props.tvShow.socialLinks } />
                    }

                    {
                        props.tvShow.overview &&
                        <div className="p-tv-show__details-overview">
                            <p className="p-tv-show__details-overview-title">
                                Overview:
                            </p>

                            <ShowMore
                                className="p-tv-show__details-overview-text"
                                lines={ 5 }
                            >
                                { props.tvShow.overview }
                            </ShowMore>
                        </div>
                    }
                </Container>
            </div>

            {
                (props.tvShow.created_by.length > 0 || props.tvShow.networks.length > 0 || props.tvShow.production_companies.length > 0) &&
                <Container className="p-tv-show__details-content">
                    {
                        props.tvShow.created_by.length > 0 &&
                        <div className="p-tv-show__details-creators">
                            <p className="p-tv-show__details-creators-title">
                                Creators:
                            </p>

                            <ul className="p-tv-show__details-creators-list">
                                {
                                    props.tvShow.created_by.map(
                                        (creator, index) => (
                                            <li key={ index }>
                                                <Link
                                                    href={ pagesPersonUrl(String(creator.id)) }
                                                    className="p-tv-show__details-creators-item u-link"
                                                >

                                                    <div className="p-tv-show__details-creators-logo">
                                                        <Image
                                                            src={
                                                                creator.profile_path
                                                                    ? imageUrl(IMG_SIZES.CREATOR_AVATAR, creator.profile_path)
                                                                    : '/img/avatar-placeholder.svg'
                                                            }
                                                            fill
                                                            sizes="50px"
                                                            alt={ creator.name }
                                                        />
                                                    </div>

                                                    <div className="p-tv-show__details-creators-content">
                                                        { creator.name }
                                                    </div>
                                                </Link>
                                            </li>
                                        ))
                                }
                            </ul>
                        </div>
                    }

                    {
                        props.tvShow.networks.length > 0 &&
                        <div className="p-tv-show__details-networks">
                            <p className="p-tv-show__details-networks-title">
                                Networks:
                            </p>
                            <ul className="p-tv-show__details-networks-list">
                                {
                                    props.tvShow.networks.map(
                                        (network, index) => (
                                            <li 
                                                key={ index } className="p-tv-show__details-networks-item"
                                            >
                                                <div className="p-tv-show__details-networks-logo">
                                                    <Image
                                                        src={
                                                            network.logo_path
                                                                ? imageUrl(IMG_SIZES.NETWORK_LOGO, network.logo_path)
                                                                : '/img/image-placeholder.svg'
                                                        }
                                                        fill
                                                        sizes="50px"
                                                        alt={ network.name }
                                                    />
                                                </div>

                                                <div className="p-tv-show__details-networks-content">
                                                    <div className="text-lg font-semibold">
                                                        { network.name }

                                                        <Popover
                                                            trigger={
                                                                <button
                                                                    type="button"
                                                                    className="p-tv-show__details-networks-trigger"
                                                                >
                                                                    i
                                                                </button>
                                                            }
                                                            classNames={
                                                                {
                                                                    content: 'p-tv-show__details-networks-details'
                                                                }
                                                            }
                                                            isArrow
                                                        >
                                                            <NetworkDetails id={ network.id } /> 
                                                        </Popover>
                                                    </div>

                                                    {
                                                        network.origin_country &&
                                                        <span className="opacity-75 text-sm">
                                                            { network.origin_country }
                                                        </span>
                                                    }
                                                </div>
                                            </li>
                                        )
                                    )
                                }
                            </ul>
                        </div>
                    }

                    {
                        props.tvShow.production_companies.length > 0 &&
                        <div className="p-tv-show__details-companies">
                            <p className="p-tv-show__details-companies-title">
                                Production companies:
                            </p>
                            <ul className="p-tv-show__details-companies-list">
                                {
                                    props.tvShow.production_companies.map(
                                        (company, index) => (
                                            <li 
                                                key={ index } className="p-tv-show__details-companies-item"
                                            >
                                                <div className="p-tv-show__details-companies-logo">
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

                                                <div className="p-tv-show__details-companies-content">
                                                    <div className="text-lg font-semibold">
                                                        { company.name }

                                                        <Popover
                                                            trigger={
                                                                <button
                                                                    type="button"
                                                                    className="p-tv-show__details-companies-trigger"
                                                                >
                                                                    i
                                                                </button>
                                                            }
                                                            classNames={
                                                                {
                                                                    content: 'p-tv-show__details-companies-details'
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
                    }
                </Container>
            }
        </div>
    );
}
