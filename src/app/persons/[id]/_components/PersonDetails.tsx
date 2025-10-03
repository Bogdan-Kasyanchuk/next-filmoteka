import { ShowMore } from '@re-dev/react-truncate';
import Image from 'next/image';
import { Fragment } from 'react';

import SocialLinks from '@/components/ui/data-display/SocialLinks';
import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { IMG_SIZES } from '@/helpers/parameters';
import { imageUrl } from '@/routes';
import { PersonDetailsMapper } from '@/types';
import { formatDate } from '@/utils/formateDate';

type Props = {
    person: PersonDetailsMapper['person']
}

export default function PersonDetails(props: Props) {
    return (
        <div className='p-person__details'>
            <div className='p-person__details-backdrop'>
                <Image
                    src={imageUrl(IMG_SIZES.PERSON_CARD_DETAILS_COVER, props.person.profile_path)}
                    sizes='(max-width: 767px) 768px, (max-width: 1319px) 1320px, 1920px'
                    alt={props.person.name}
                    fill
                />
            </div>

            <Container className='p-person__details-container'>
                <div className='p-person__details-cover'>
                    {
                        props.person.adult &&
                        <div className='p-person__details-adult'>
                            18<span>+</span>
                        </div>
                    }

                    <Image
                        src={
                            props.person.profile_path
                                ? imageUrl(IMG_SIZES.PERSON_CARD_DETAILS_COVER, props.person.profile_path)
                                : '/img/poster-not-available.jpg'
                        }
                        sizes='(max-width: 767px) 253px, (max-width: 1319px) 326px, 421px'
                        alt={props.person.name}
                        fill
                    />
                </div>

                <Title className='p-person__details-name'>
                    {props.person.name}
                </Title>

                <ul className='p-person__details-list-info'>
                    {
                        props.person.homepage &&
                        <li className='p-person__details-list-info-item p-person__details-list-info-item--link'>
                            <span>WebSite:</span>
                            <a
                                href={props.person.homepage}
                                rel='noopener noreferrer'
                                target='_blank'
                            >
                                {props.person.homepage}
                            </a>
                        </li>
                    }

                    <li className='p-person__details-list-info-item'>
                        <span>Department:</span>
                        {props.person.known_for_department}
                    </li>

                    {
                        props.person.place_of_birth &&
                        <li className='p-person__details-list-info-item'>
                            <span>Place of birth:</span>
                            {props.person.place_of_birth}
                        </li>
                    }

                    {
                        props.person.birthday &&
                        <li className='p-person__details-list-info-item'>
                            <span>Birthday:</span>
                            <span>{formatDate(props.person.birthday, 'DD.MM.YYYY')}</span>
                        </li>
                    }

                    {
                        props.person.deathday &&
                        <li className='p-person__details-list-info-item'>
                            <span>Deathday:</span>
                            <span>{formatDate(props.person.deathday, 'DD.MM.YYYY')}</span>
                        </li>
                    }

                    <li className='p-person__details-list-info-item'>
                        <span>Popularity:</span>
                        {Math.round(props.person.popularity)}
                    </li>

                    {
                        props.person.also_known_as.length > 0 &&
                        <li className='p-person__details-list-info-item'>
                            <span className='self-start'>Also known as:</span>
                            <span>
                                {
                                    props.person.also_known_as.map(
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
                    props.person.socialLinks.length > 0 &&
                    <SocialLinks socials={props.person.socialLinks} />
                }

                {
                    props.person.biography &&
                    <div className='p-person__details-biography'>
                        <p className='p-person__details-biography-title'>
                            Biography:
                        </p>

                        <ShowMore
                            className='p-person__details-biography-text'
                            lines={3}
                        >
                            {props.person.biography}
                        </ShowMore>
                    </div>
                }
            </Container>
        </div>
    );
};