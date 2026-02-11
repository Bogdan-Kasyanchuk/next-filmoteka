import { ShowMore } from '@re-dev/react-truncate';
import Image from 'next/image';
import Link from 'next/link';

import Title from '@/components/ui/typography/Title';
import { IMG_SIZES, PLACEHOLDERS } from '@/datasets/constants';
import { imageUrl, pagesTVShowUrl } from '@/routes';
import { CurrentTVShowMapper, TVShowSeasonDetailsMapper } from '@/types';
import formatDate from '@/utils/formateDate';

type Props = {
    tvShow: {
        name: CurrentTVShowMapper['name'],
        first_air_date: CurrentTVShowMapper['first_air_date']
    },
    season: TVShowSeasonDetailsMapper['season'],
    id: string
};

export default function CurrentSeason(props: Props) {
    return (
        <div className="p-season__current-season">
            <div className="p-season__current-season-inner">
                <div className="p-season__current-season-cover">
                    <Image
                        src={
                            props.season.poster_path
                                ? imageUrl(IMG_SIZES.SEASON_DETAILS_COVER, props.season.poster_path)
                                : '/img/poster-not-available.jpg'
                        }
                        sizes="87px"
                        alt={ props.season.name }
                        placeholder={ PLACEHOLDERS[ '2x3_small' ] }
                        fill
                        preload
                        loading="eager"
                    />
                </div>

                <div className="p-season__current-season-info">
                    <Title
                        className="p-season__current-season-tv-show-title"
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

                    <h3
                        className="p-season__current-season-title"
                        title={
                            `${ props.season.name } ${ formatDate(props.season.air_date, 'DD.MM.YYYY') }`
                        }
                    >
                        { props.season.name }&nbsp;({ formatDate(props.season.air_date, 'DD.MM.YYYY') })
                    </h3>

                    <div className="p-season__current-season-tags">
                        <div className="p-season__current-season-tag p-season__current-season-tag--type">
                            Season:&nbsp;{ props.season.season_number }
                        </div>

                        <div className="p-season__current-season-tag p-season__current-season-tag--average">
                            { Math.round((props.season.vote_average ?? 0) * 10) }
                            <span>%</span>
                        </div>
                    </div>
                </div>
            </div>

            {
                props.season.overview &&
                <div className="p-season__current-season-overview">
                    <ShowMore
                        className="p-season__current-season-overview-text"
                        lines={ 5 }
                    >
                        { props.season.overview }
                    </ShowMore>
                </div>
            }
        </div>
    );
}