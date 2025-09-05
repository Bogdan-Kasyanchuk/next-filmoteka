import Image from 'next/image';
import { Fragment } from 'react';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { GenderType } from '@/enums';
import { PARAMETERS, IMG_SIZES } from '@/helpers/parameters';
import { PersonDetailsMapper } from '@/types';
import { formatDate } from '@/utils/formateDate';

type Props = PersonDetailsMapper['person']

export default function PersonDetails(props: Props) {
    return (
        <div className='с-person-details'>
            <div className='с-person-details__backdrop'>
                <Image
                    src={`${PARAMETERS.URL_IMG}${IMG_SIZES.PERSON_CARD_DETAILS_COVER}${props.profile_path}`}
                    sizes="(max-width: 767px) 768px, (max-width: 1319px) 1320px, 1920px"
                    alt={props.name}
                    fill
                />
            </div>

            <Container className='с-person-details__container'>
                <div className='с-person-details__cover'>
                    {
                        !props.adult &&
                        <div className='с-person-details__adult'>
                            18<span>+</span>
                        </div>
                    }

                    {
                        props.gender === GenderType.MAN &&
                        <div className='с-person-details__gender'>
                            Man
                        </div>
                    }

                    {
                        props.gender === GenderType.WOMAN &&
                        <div className='с-person-details__gender'>
                            Woman
                        </div>
                    }

                    <Image
                        src={
                            props.profile_path
                                ? `${PARAMETERS.URL_IMG}${IMG_SIZES.PERSON_CARD_DETAILS_COVER}${props.profile_path}`
                                : '/img/poster-not-available.jpg'
                        }
                        sizes="(max-width: 767px) 253px, (max-width: 1319px) 326px, 350px"
                        alt={props.name}
                        fill
                    />
                </div>

                <Title className='с-person-details__name'>
                    {props.name}
                </Title>

                <ul className='с-person-details__list-info'>
                    {
                        props.imdb_id &&
                        <li className='с-person-details__list-info-item с-person-details__list-info-item--link'>
                            <span>IMDB:</span>
                            <a
                                href={`https://www.imdb.com/name/${props.imdb_id}`}
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                https://www.imdb.com/name/{props.imdb_id}
                            </a>
                        </li>
                    }

                    {
                        props.homepage &&
                        <li className='с-person-details__list-info-item с-person-details__list-info-item--link'>
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

                    <li className='с-person-details__list-info-item'>
                        <span>Department:</span>
                        {props.known_for_department}
                    </li>

                    {
                        props.place_of_birth &&
                        <li className='с-person-details__list-info-item'>
                            <span>Place of birth:</span>
                            {props.place_of_birth}
                        </li>
                    }

                    {
                        props.birthday &&
                        <li className='с-person-details__list-info-item'>
                            <span>Birthday:</span>
                            <span>{formatDate(props.birthday, 'DD.MM.YYYY')}</span>
                        </li>
                    }

                    {
                        props.deathday &&
                        <li className='с-person-details__list-info-item'>
                            <span>Deathday:</span>
                            <span>{formatDate(props.deathday, 'DD.MM.YYYY')}</span>
                        </li>
                    }

                    <li className='с-person-details__list-info-item'>
                        <span>Popularity:</span>
                        {Math.round(props.popularity)}
                    </li>

                    {
                        props.also_known_as.length > 0 &&
                        <li className='с-person-details__list-info-item'>
                            <span className='self-start'>Also known as:</span>
                            <span>
                                {
                                    props.also_known_as.map(
                                        (item, index) => (
                                            <Fragment key={index}>
                                                {index !== 0 && <>&nbsp;|&nbsp;</>}
                                                {item}
                                            </Fragment>
                                        ))
                                }
                            </span>
                        </li>
                    }
                </ul>

                {
                    props.biography &&
                    <div className='с-person-details__biography'>
                        <p className='с-person-details__biography-title'>
                            Biography:
                        </p>
                        <p className='с-person-details__biography-text'>
                            {props.biography}
                        </p>
                    </div>
                }
            </Container>
        </div>
    );
};
