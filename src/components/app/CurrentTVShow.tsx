import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';

import Title from '@/components/ui/typography/Title';
import { IMG_SIZES } from '@/helpers/parameters';
import { imageUrl, pagesTVShowUrl } from '@/routes';
import { CurrentTVShowMapper } from '@/types';
import formatDate from '@/utils/formateDate';

type Props = {
    tvShow: CurrentTVShowMapper,
    id: string
};

export default function CurrentTVShow(props: Props) {
    return (
        <div className="c-current-tv-show">
            <div className="c-current-tv-show__cover">
                <Image
                    src={
                        props.tvShow.poster_path
                            ? imageUrl(IMG_SIZES.MEDIA_CARD_CURRENT_COVER, props.tvShow.poster_path)
                            : '/img/poster-not-available.jpg'
                    }
                    sizes="81px"
                    alt={ props.tvShow.name }
                    fill
                    fetchPriority="high"
                />
            </div>

            <div className="c-current-tv-show__info">
                <Title
                    className="c-current-tv-show__title"
                    variant={ 3 }
                >
                    <Link
                        href={ pagesTVShowUrl(props.id) }
                        title={
                            `${ props.tvShow.name } ${ formatDate(props.tvShow.first_air_date, 'YYYY') }`
                        }
                        className="u-link-color"
                    >
                        { props.tvShow.name }&nbsp;({ formatDate(props.tvShow.first_air_date, 'YYYY') })
                    </Link>
                </Title>

                <div className="c-current-tv-show__tags">
                    <div className="c-current-tv-show__tag c-current-tv-show__tag--type">
                        { props.tvShow.media_type }
                    </div>

                    <div className="c-current-tv-show__tag c-current-tv-show__tag--average">
                        { Math.round((props.tvShow.vote_average ?? 0) * 10) }
                        <span>%</span>
                    </div>

                    {
                        props.tvShow.adult &&
                        <div className="c-current-tv-show__tag c-current-tv-show__tag--adult">
                            18<span>+</span>
                        </div>
                    }
                </div>

                {
                    props.tvShow.genres.length > 0 &&
                    <div className="c-current-tv-show__genres">
                        {
                            props.tvShow.genres.map(
                                (genre, index) => (
                                    <Fragment key={ index }>
                                        { index !== 0 && <>&nbsp;|&nbsp;</> }
                                        { genre }
                                    </Fragment>
                                ))
                        }
                    </div>
                }
            </div>
        </div>
    );
}