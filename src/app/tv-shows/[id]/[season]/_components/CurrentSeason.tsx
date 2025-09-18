import Image from 'next/image';
import Link from 'next/link';

import Title from '@/components/ui/typography/Title';
import { IMG_SIZES, PARAMETERS } from '@/helpers/parameters';
import { TVShowSeasonDetailsMapper } from '@/types';
import { formatDate } from '@/utils/formateDate';
import { pagesTVUrl } from '@/routes';

type Props = {
    season: TVShowSeasonDetailsMapper['season'];
    id: string;
}

export default function CurrentSeason(props: Props) {
    return (
        <div className='p-season__current-season'>
            <div className='p-season__current-season-inner'>
                <div className='p-season__current-season-cover'>
                    <Image
                        src={
                            props.season.poster_path
                                ? `${PARAMETERS.URL_IMG}${IMG_SIZES.SEASON_CARD_DETAILS_COVER}${props.season.poster_path}`
                                : '/img/poster-not-available.jpg'
                        }
                        sizes="92px"
                        alt={props.season.name}
                        fill
                    />
                </div>

                <div className='p-season__current-season-info'>
                    <Link
                        href={`${pagesTVUrl()}/${props.id}`}
                        className='u-link-color font-bold leading-none text-md'
                    >
                        Go to TV Show
                    </Link>

                    <Title
                        className='p-season__current-season-title'
                        title={
                            `${props.season.name} ${formatDate(props.season.air_date, 'DD.MM.YYYY')}`
                        }
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
                </div>
            </div>

            {
                props.season.overview &&
                <p className='p-season__current-season-overview'>
                    {props.season.overview}
                </p>
            }
        </div>
    );
}