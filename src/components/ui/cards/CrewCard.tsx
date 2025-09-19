import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { PARAMETERS, IMG_SIZES } from '@/helpers/parameters';
import { pagesPersonsUrl } from '@/routes';
import { CrewMapper } from '@/types';

type Props = {
    crew: CrewMapper
}

export default function CrewCard(props: Props) {
    return (
        <Link
            href={`${pagesPersonsUrl()}/${props.crew.id}`}
            className='с-crew-card'
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
                            ? `${PARAMETERS.URL_IMG}${IMG_SIZES.CREW_CARD_COVER}${props.crew.profile_path}`
                            : '/img/avatar-placeholder.svg'
                    }
                    sizes='180px'
                    alt={props.crew.name}
                    fill
                />
            </div>

            <div className='с-crew-card__tag'>
                {Math.round(props.crew.popularity)}
            </div>

            <div className='с-crew-card__footer'>
                <p
                    className='с-crew-card__footer-name'
                    title={props.crew.name}
                >
                    {props.crew.name}
                </p>

                <p
                    className='с-crew-card__footer-job'
                    title={props.crew.job}
                >
                    {props.crew.job}
                </p>
            </div>
        </Link >
    );
};
