import clsx from 'clsx';
import Image from 'next/image';

import { IMG_SIZES } from '@/datasets/constants';
import { PLACEHOLDERS } from '@/datasets/placeholders';
import { imageUrl, pagesPersonUrl } from '@/routes';
import { Link } from '@/services/i18n/navigation';
import { CrewMapper } from '@/types';

type Props = {
    crew: CrewMapper
};

export default function CrewCard(props: Props) {
    return (
        <Link
            href={ pagesPersonUrl(props.crew.id) }
            className="с-crew-card"
        >
            <div
                className={
                    clsx('с-crew-card__cover', {
                        'bg-primary': !props.crew.profile_path
                    })
                }
            >
                <Image
                    src={
                        props.crew.profile_path
                            ? imageUrl(IMG_SIZES.CREW_COVER, props.crew.profile_path)
                            : '/img/avatar-placeholder.svg'
                    }
                    sizes="161px"
                    alt={ props.crew.name }
                    placeholder={ PLACEHOLDERS[ '1x1' ] }
                    fill
                />
            </div>

            <div className="с-crew-card__tag">
                { Math.round(props.crew.popularity ?? 0) }
            </div>

            <div className="с-crew-card__footer">
                <p
                    className="с-crew-card__footer-name"
                    title={ props.crew.name }
                >
                    { props.crew.name }
                </p>

                <p
                    className="с-crew-card__footer-job"
                    title={ props.crew.job }
                >
                    { props.crew.job }
                </p>
            </div>
        </Link>
    );
}
