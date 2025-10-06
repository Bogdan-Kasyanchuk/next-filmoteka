import Image from 'next/image';
import Link from 'next/link';

import { GenderType } from '@/enums';
import { IMG_SIZES } from '@/helpers/parameters';
import { imageUrl, pagesPersonUrl } from '@/routes';
import { PersonMapper } from '@/types';

type Props = {
    person: PersonMapper
};

export default function PersonCard(props: Props) {
    return (
        <Link
            href={ pagesPersonUrl(String(props.person.id)) }
            className="с-person-card"
        >
            <div className="с-person-card__cover">
                <Image
                    src={
                        props.person.profile_path
                            ? imageUrl(IMG_SIZES.PERSON_CARD_COVER, props.person.profile_path)
                            : '/img/poster-not-available.jpg'
                    }
                    sizes="(max-width: 479px) 173px, (max-width: 767px) 213px, (max-width: 1023px) 230px, 421px"
                    alt={ props.person.name }
                    fill
                />
            </div>

            <div className="с-person-card__tags">
                {
                    props.person.gender === GenderType.MAN &&
                    <div className="с-person-card__tag с-person-card__tag--gender">
                        Man
                    </div>
                }

                {
                    props.person.gender === GenderType.WOMAN &&
                    <div className="с-person-card__tag с-person-card__tag--gender">
                        Woman
                    </div>
                }

                {
                    props.person.adult &&
                    <div className="с-person-card__tag с-person-card__tag--adult">
                        18<span>+</span>
                    </div>
                }

                <div className="с-person-card__tag с-person-card__tag--popularity">
                    { Math.round(props.person.popularity) }
                </div>
            </div>

            <div className="с-person-card__footer">
                <p
                    className="с-person-card__footer-name"
                    title={ props.person.name }
                >
                    { props.person.name }
                </p>
                <p
                    className="с-person-card__footer-department"
                    title={ props.person.known_for_department }
                >
                    { props.person.known_for_department }
                </p>
            </div>
        </Link>
    );
}
