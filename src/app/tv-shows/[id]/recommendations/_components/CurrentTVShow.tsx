import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

import Title from '@/components/ui/typography/Title';
import { IMG_SIZES, PARAMETERS } from '@/helpers/parameters';
import { pagesTVUrl } from '@/routes';
import { CurrentTVShowMapper } from '@/types';
import { formatDate } from '@/utils/formateDate';

type Props = {
    tvShow: CurrentTVShowMapper;
    id: string;
}

export default function CurrentTVShow(props: Props) {
    return (
        <div className='p-tv-show-recommendations__current-tv-show'>
            <div className='p-tv-show-recommendations__current-tv-show-cover'>
                <Image
                    src={
                        props.tvShow.poster_path
                            ? `${PARAMETERS.URL_IMG}${IMG_SIZES.MEDIA_CARD_CURRENT_COVER}${props.tvShow.poster_path}`
                            : '/img/poster-not-available.jpg'
                    }
                    sizes="92px"
                    alt={props.tvShow.name}
                    fill
                />
            </div>

            <div className='p-tv-show-recommendations__current-tv-show-info'>
                <Title
                    className='p-tv-show-recommendations__current-tv-show-title'
                    variant={3}
                >
                    <Link
                        href={`${pagesTVUrl()}/${props.id}`}
                        title={
                            `${props.tvShow.name} ${formatDate(props.tvShow.first_air_date, 'YYYY')}`
                        }
                        className='u-link-color'
                    >
                        {props.tvShow.name}&nbsp;({formatDate(props.tvShow.first_air_date, 'YYYY')})
                    </Link>
                </Title>

                <div className='p-tv-show-recommendations__current-tv-show-tags'>
                    <div className='p-tv-show-recommendations__current-tv-show-tag p-tv-show-recommendations__current-tv-show-tag--type'>
                        {props.tvShow.media_type}
                    </div>

                    <div className='p-tv-show-recommendations__current-tv-show-tag p-tv-show-recommendations__current-tv-show-tag--average'>
                        {Math.round(props.tvShow.vote_average * 10)}
                        <span>%</span>
                    </div>

                    {
                        props.tvShow.adult &&
                        <div className='p-tv-show-recommendations__current-tv-show-tag p-tv-show-recommendations__current-tv-show-tag--adult'>
                            18<span>+</span>
                        </div>
                    }
                </div>

                {
                    props.tvShow.genres.length > 0 &&
                    <div className='p-tv-show-recommendations__current-tv-show-genres'>
                        {
                            props.tvShow.genres.map(
                                (genre, index) => (
                                    <Fragment key={index}>
                                        {index !== 0 && <>&nbsp;|&nbsp;</>}
                                        {genre}
                                    </Fragment>
                                ))
                        }
                    </div>
                }
            </div>
        </div>
    );
}