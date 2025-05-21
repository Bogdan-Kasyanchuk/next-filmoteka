import Image from 'next/image';

import { PARAMETERS, IMG_SIZES } from '@/helpers/parameters';
import { TVShowDetailsMapper } from '@/types';

type Props = {
    tvShow: TVShowDetailsMapper
}

export default function TVShowDetails(props: Props) {
    return (
        <div className={'movie-card-details'}>
            <div className={'movie-card-details-wrapper-img'}>
                <Image
                    src={
                        props.tvShow.poster_path
                            ? `${PARAMETERS.URL_IMG}/${IMG_SIZES.MEDIA_CARD_DETAILS_COVER}/${props.tvShow.poster_path}`
                            : '/img/poster-not-available.jpg'
                    }
                    sizes="(max-width: 479px) 173px, (max-width: 767px) 213px, (max-width: 1023px) 230px, 294px"
                    alt={props.tvShow.name}
                    fill
                />
            </div>
            <div className={'movie-card-details-description'}>
                <h2 className={'movie-card-details-title'}>
                    {props.tvShow.name}
                </h2>
                <ul className={'movie-card-details-list'}>
                    <li className={'movie-card-details-item'}>
                        Vote count: <span>{props.tvShow.vote_count}</span>
                    </li>
                    <li className={'movie-card-details-item'}>
                        Vote average: <span>{props.tvShow.vote_average}</span>
                    </li>
                    <li className={'movie-card-details-item'}>
                        Popularity: <span>{props.tvShow.popularity.toFixed(1)}</span>
                    </li>
                </ul>
                <div className={'movie-card-details-overview'}>
                    <h3 className={'movie-card-details-overview-title'}>
                        Overview:
                    </h3>
                    <p className={'movie-card-details-overview-text'}>
                        {props.tvShow.overview}
                    </p>
                </div>
                <div className={'movie-card-details-genres'}>
                    <h3 className={'movie-card-details-genres-title'}>Genres:</h3>
                    <ul className={'movie-card-details-genres-list'}>
                        {
                            props.tvShow.genres.map(
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
                            props.tvShow.production_companies.map(
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
                </div>
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
        </div>
    );
};
