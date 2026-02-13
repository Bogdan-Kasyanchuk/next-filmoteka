'use client';

import { ShowMore } from '@re-dev/react-truncate';
import Image from 'next/image';
import { useExtracted, useFormatter } from 'next-intl';

import Title from '@/components/ui/typography/Title';
import { IMG_SIZES } from '@/datasets/constants';
import { PLACEHOLDERS } from '@/datasets/placeholders';
import { imageUrl, pagesTVShowUrl } from '@/routes';
import { Link } from '@/services/i18n/navigation';
import { CurrentTVShowMapper, TVShowSeasonDetailsMapper } from '@/types';

type Props = {
    tvShow: {
        name: CurrentTVShowMapper['name'],
        first_air_date: CurrentTVShowMapper['first_air_date']
    },
    season: TVShowSeasonDetailsMapper['season'],
    id: string
};

export default function CurrentSeason(props: Props) {
    const format = useFormatter();
    
    const t = useExtracted();

    const firstAirDate = props.tvShow.first_air_date &&
    format.dateTime(props.tvShow.first_air_date, { year: 'numeric' });

    const airDate = props.season.air_date &&
    format.dateTime(props.season.air_date, { year: 'numeric' });
        
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
                        placeholder={ PLACEHOLDERS[ '2x3' ] }
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
                            title={ `${ props.tvShow.name } ${ firstAirDate ?? '' }` }
                            className="u-link-color"
                        >
                            { props.tvShow.name }
                            { firstAirDate && <>&nbsp;({ firstAirDate })</> }
                        </Link>
                    </Title>

                    <h3
                        className="p-season__current-season-title"
                        title={ `${ props.season.name } ${ airDate ?? '' }` }
                    >
                        { props.season.name }
                        { airDate && <>&nbsp;({ airDate })</> }
                    </h3>

                    <div className="p-season__current-season-tags">
                        <div className="p-season__current-season-tag p-season__current-season-tag--type">
                            { 
                                t('Season: {season}', {
                                    season: props.season.season_number.toString()
                                }) 
                            }
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