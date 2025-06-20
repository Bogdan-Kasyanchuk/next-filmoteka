'use client';

import Image from 'next/image';

import Title from '@/components/ui/typography/Title';
import { IMG_SIZES, PARAMETERS } from '@/helpers/parameters';
import { TVShowSeasonDetailsMapper } from '@/types';
import { formatDate } from '@/utils/formateDate';

type Props = {
    season: TVShowSeasonDetailsMapper['season'];
    id: string;
}

export default function CurrentSeason(props: Props) {
    return (
        <div className='p-season__current-season'>
            <div className='p-season__current-season-cover'>
                <Image
                    src={
                        props.season.poster_path
                            ? `${PARAMETERS.URL_IMG}${IMG_SIZES.SEASON_CARD_DETAILS_COVER}${props.season.poster_path}`
                            : '/img/poster-not-available.jpg'
                    }
                    sizes="100px"
                    alt={props.season.name}
                    fill
                />
            </div>

            <div className='p-season__current-season-info'>
                <Title
                    className='p-season__current-season-title'
                    variant={3}
                >
                    {props.season.name}&nbsp;({formatDate(props.season.air_date, 'DD.MM.YYYY')})
                </Title>

                <div className='p-season__current-season-tags'>
                    <div className='p-season__current-season-tag p-season__current-season-tag--type'>
                        Season:&nbsp;{props.season.season_number}
                    </div>

                    <div className='p-season__current-season-tag p-season__current-season-tag--average'>
                        {Math.round(props.season.vote_average * 10)}
                        <span>%</span>
                    </div>
                </div>

                {
                    props.season.overview &&
                    <p className='p-season__current-season-overview'>
                        {props.season.overview}
                    </p>
                }
            </div>
        </div>
    );
}