import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { IMG_SIZES, PLACEHOLDERS } from '@/datasets/constants';
import { imageUrl, pagesPersonUrl } from '@/routes';
import { CastMapper } from '@/types';

type Props = {
    cast: CastMapper
};

export default function CastCard(props: Props) {
    return (
        <Link
            href={ pagesPersonUrl(props.cast.id) }
            className="с-cast-card"
        >
            <div
                className={
                    clsx('с-cast-card__cover', {
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
                    placeholder={ PLACEHOLDERS[ '1x1_small' ] }
                    fill
                />
            </div>
   
            <div className="с-cast-card__tag">
                { Math.round(props.cast.popularity ?? 0) }
            </div>

            <div className="с-cast-card__footer">
                <p
                    className="с-cast-card__footer-name"
                    title={ props.cast.name }
                >
                    { props.cast.name }
                </p>

                <p
                    className="с-cast-card__footer-character"
                    title={ props.cast.character }
                >
                    { props.cast.character }
                </p>
            </div>
        </Link>
    );
}
