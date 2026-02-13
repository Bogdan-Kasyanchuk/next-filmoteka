'use client';

import Image from 'next/image';
import { useExtracted } from 'next-intl';

import { IMG_SIZES } from '@/datasets/constants';
import { PLACEHOLDERS } from '@/datasets/placeholders';
import { imageUrl, pagesPersonUrl } from '@/routes';
import { Link } from '@/services/i18n/navigation';
import { PersonMapper } from '@/types';

type Props = {
    person: PersonMapper,
    preload?: boolean
};

export default function PersonCard(props: Props) {
    const t = useExtracted();
        
    return (
        <div className="с-person-card">
            <div className="с-person-card__cover">
                <Image
                    src={
                        props.person.profile_path
                            ? imageUrl(IMG_SIZES.PERSON_COVER, props.person.profile_path)
                            : '/img/poster-not-available.jpg'
                    }
                    sizes="(max-width: 479px) 174px, (max-width: 767px) 214px, (max-width: 1023px) 231px, 295px"
                    alt={ props.person.name }
                    placeholder={ PLACEHOLDERS[ '2x3' ] }
                    fill
                    preload={ props.preload }
                    loading={ props.preload ? 'eager' : 'lazy' }
                />
            </div>

            <div className="с-person-card__tags">
                <div className="с-person-card__tag с-person-card__tag--type">
                    { t('Person') }
                </div>

                {
                    props.person.adult &&
                    <div className="с-person-card__tag с-person-card__tag--adult">
                        18<span>+</span>
                    </div>
                }

                <div className="с-person-card__tag с-person-card__tag--popularity">
                    { Math.round(props.person.popularity ?? 0) }
                </div>
            </div>

            <div className="с-person-card__footer">
                <Link
                    href={ pagesPersonUrl(props.person.id) }
                    className="с-person-card__footer-name u-overlay"
                    title={ props.person.name }
                >
                    { props.person.name }
                </Link>
                
                <p className="с-person-card__footer-department">
                    { props.person.known_for_department }
                </p>
            </div>
        </div>
    );
}
