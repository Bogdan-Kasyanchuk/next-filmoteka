import clsx from 'clsx';
import Image from 'next/image';

import { PARAMETERS, IMG_SIZES } from '@/helpers/parameters';
import { CastMapper } from '@/types';

type Props = {
    cast: CastMapper
}

export default function CastCard(props: Props) {

    return (
        <div className='с-cast-card'>
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
                            ? `${PARAMETERS.URL_IMG}${IMG_SIZES.CAST_CARD_COVER}${props.cast.profile_path}`
                            : '/img/avatar-placeholder.svg'
                    }
                    sizes="170px"
                    alt={props.cast.name}
                    fill
                />
            </div>

            <div className='с-cast-card__tag'>
                {Math.round(props.cast.popularity)}
            </div>

            <div className='с-cast-card__footer'>
                <p className='с-cast-card__footer-name'>
                    {props.cast.name}
                </p>

                <p className='с-cast-card__footer-character'>
                    {props.cast.character}
                </p>
            </div>
        </div >
    );
};
