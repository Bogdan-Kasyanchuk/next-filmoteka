import Image from 'next/image';
import { Fragment } from 'react';

import SocialLinks from '@/components/ui/data-display/SocialLinks';
import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { PARAMETERS, IMG_SIZES } from '@/helpers/parameters';
import { PersonDetailsMapper } from '@/types';
import { formatDate } from '@/utils/formateDate';

type Props = PersonDetailsMapper['person']

export default function PersonDetails(props: Props) {
    return (
        <div className='p-person__details'>
            <div className='p-person__details-backdrop'>
                <Image
                    src={`${PARAMETERS.URL_IMG}/${IMG_SIZES.PERSON_CARD_DETAILS_COVER}${props.profile_path}`}
                    sizes='(max-width: 767px) 768px, (max-width: 1319px) 1320px, 1920px'
                    alt={props.name}
                    fill
                />
            </div>

            <Container className='p-person__details-container'>
                <div className='p-person__details-cover'>
                    {
                        props.adult &&
                        <div className='p-person__details-adult'>
                            18<span>+</span>
                        </div>
                    }

                    <Image
                        src={
                            props.profile_path
                                ? `${PARAMETERS.URL_IMG}/${IMG_SIZES.PERSON_CARD_DETAILS_COVER}${props.profile_path}`
                                : '/img/poster-not-available.jpg'
                        }
                        sizes='(max-width: 767px) 253px, (max-width: 1319px) 326px, 421px'
                        alt={props.name}
                        fill
                    />
                </div>

                <Title className='p-person__details-name'>
                    {props.name}
                </Title>

                <ul className='p-person__details-list-info'>
                    {
                        props.homepage &&
                        <li className='p-person__details-list-info-item p-person__details-list-info-item--link'>
                            <span>WebSite:</span>
                            <a
                                href={props.homepage}
                                rel='noopener noreferrer'
                                target='_blank'
                            >
                                {props.homepage}
                            </a>
                        </li>
                    }

                    <li className='p-person__details-list-info-item'>
                        <span>Department:</span>
                        {props.known_for_department}
                    </li>

                    {
                        props.place_of_birth &&
                        <li className='p-person__details-list-info-item'>
                            <span>Place of birth:</span>
                            {props.place_of_birth}
                        </li>
                    }

                    {
                        props.birthday &&
                        <li className='p-person__details-list-info-item'>
                            <span>Birthday:</span>
                            <span>{formatDate(props.birthday, 'DD.MM.YYYY')}</span>
                        </li>
                    }

                    {
                        props.deathday &&
                        <li className='p-person__details-list-info-item'>
                            <span>Deathday:</span>
                            <span>{formatDate(props.deathday, 'DD.MM.YYYY')}</span>
                        </li>
                    }

                    <li className='p-person__details-list-info-item'>
                        <span>Popularity:</span>
                        {Math.round(props.popularity)}
                    </li>

                    {
                        props.also_known_as.length > 0 &&
                        <li className='p-person__details-list-info-item'>
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
                    props.socialLinks.length > 0 &&
                    <SocialLinks socials={props.socialLinks} />
                }

                {
                    props.biography &&
                    <div className='p-person__details-biography'>
                        <p className='p-person__details-biography-title'>
                            Biography:
                        </p>
                        <p className='p-person__details-biography-text'>
                            {props.biography}
                        </p>
                    </div>
                }
            </Container>
        </div>
    );
};
