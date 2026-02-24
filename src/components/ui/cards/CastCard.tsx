import clsx from 'clsx';
import Image from 'next/image';

import { IMG_SIZES } from '@/datasets/constants';
import { PLACEHOLDERS } from '@/datasets/placeholders';
import { imageUrl } from '@/helpers/externalUrls';
import { pagesPersonUrl } from '@/routes';
import { Link } from '@/services/i18n/navigation';
import { CastMapper } from '@/types';

type Props = {
    cast: CastMapper
};

export default function CastCard(props: Props) {
    return (
        <Link
            href={ pagesPersonUrl(props.cast.id) }
            className="c-person-card"
        >
            <div
                className={
                    clsx('c-person-card__cover', {
                        'bg-primary': !props.cast.profile_path
                    })
                }
            >
                <Image
                    src={
                        props.cast.profile_path
                            ? imageUrl(IMG_SIZES.CAST_COVER, props.cast.profile_path)
                            : '/img/avatar-placeholder.svg'
                    }
                    sizes="161px"
                    alt={ props.cast.name }
                    placeholder={ PLACEHOLDERS[ '1x1' ] }
                    fill
                />
            </div>
   
            <div className="c-person-card__tag">
                { Math.round(props.cast.popularity ?? 0) }
            </div>

            <div className="c-person-card__footer">
                <p
                    className="c-person-card__footer-name"
                    title={ props.cast.name }
                >
                    { props.cast.name }
                </p>

                <p
                    className="c-person-card__footer-character"
                    title={ props.cast.character }
                >
                    { props.cast.character }
                </p>
            </div>
        </Link>
    );
}
