'use client';

import { ShowMore } from '@re-dev/react-truncate';
import Image from 'next/image';
import { useExtracted, useFormatter } from 'next-intl';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { IMG_SIZES } from '@/datasets/constants';
import { PLACEHOLDERS } from '@/datasets/placeholders';
import { imageUrl } from '@/helpers/externalUrls';
import { pagesSeasonUrl, pagesTVShowUrl } from '@/routes';
import { Link } from '@/services/i18n/navigation';
import { CurrentTVShowMapper, EpisodeMapper } from '@/types';

import EpisodeNavigation from './EpisodeNavigation';

type Props = {
    tvShow: {
        name: CurrentTVShowMapper['name'],
        first_air_date: CurrentTVShowMapper['first_air_date']
    },
    season: number,
    episode: EpisodeMapper,
    episodes: EpisodeMapper[],
    tvShowId: string
};

export default function CurrentEpisode(props: Props) {
    const format = useFormatter();

    const t = useExtracted();

    const average = Math.round((props.episode.vote_average ?? 0) * 10);

    const airDateYear = props.episode.air_date &&
    format.dateTime(props.episode.air_date, { year: 'numeric' });

    const airDate = props.episode.air_date &&
    format.dateTime(props.episode.air_date);

    return (
        <div className="p-episode__current-episode">
            <div className="p-episode__current-episode-backdrop">
                <Image
                    src={
                        props.episode.still_path
                            ? imageUrl(IMG_SIZES.MEDIA_DETAILS_BACKDROP, props.episode.still_path)
                            : '/img/poster-not-available.jpg'
                    }
                    sizes="(max-width: 767px) 768px, (max-width: 1319px) 1320px, 1920px"
                    alt={ props.episode.name }
                    fill
                    preload
                    loading="eager"
                />
            </div>

            <Container className="p-episode__current-episode-container">
                <div className="p-episode__current-episode-cover">
                    <Image
                        src={
                            props.episode.still_path
                                ? imageUrl(IMG_SIZES.EPISODE_DETAILS_COVER, props.episode.still_path)
                                : '/img/poster-not-available.jpg'
                        }
                        sizes="(max-width: 767px) 100vw, 328px"
                        alt={ props.episode.name }
                        placeholder={ PLACEHOLDERS[ '16x9' ] }
                        fill
                        preload
                        loading="eager"
                    />
                </div>

                <EpisodeNavigation
                    episodes={ props.episodes }
                    currentEpisodeNumber={ props.episode.episode_number }
                    tvShowId={ props.tvShowId }
                    season={ props.season }
                />

                <p className="p-episode__current-episode-breadcrumb">
                    <Link
                        href={ pagesTVShowUrl(props.tvShowId) }
                        className="u-link-color"
                    >
                        { props.tvShow.name }
                    </Link>

                    <span>&nbsp;/&nbsp;</span>

                    <Link
                        href={ pagesSeasonUrl(props.tvShowId, props.season) }
                        className="u-link-color"
                    >
                        { t('Season') }
                        { ' ' }
                        { props.season }
                    </Link>
                </p>

                <Title className="p-episode__current-episode-title">
                    { props.episode.name }
                    { airDateYear && <>&nbsp;({ airDateYear })</> }
                </Title>

                <ul className="p-episode__current-episode-list-rounds">
                    <li
                        className="p-episode__current-episode-list-rounds-item"
                        style={
                            {
                                background: `conic-gradient(var(--color-success) ${ average }%, 0, var(--color-primary) ${ 100 - average }%)`
                            }
                        }
                    >
                        <div className="p-episode__current-episode-list-rounds-item-inner">
                            { average }
                            <span>%</span>
                        </div>
                    </li>

                    <li className="p-episode__current-episode-list-rounds-item">
                        { props.episode.vote_count ?? 0 }
                        <span>{ t('votes') }</span>
                    </li>

                    <li className="p-episode__current-episode-list-rounds-item">
                        { props.episode.runtime ?? 0 }
                        <span>{ t('min') }</span>
                    </li>
                </ul>

                <ul className="p-episode__current-episode-list-info">
                    {
                        airDate &&
                        <li className="p-episode__current-episode-list-info-item">
                            <span>{ t('Air date:') }</span>
                            <span>{ airDate }</span>
                        </li>
                    }

                    <li className="p-episode__current-episode-list-info-item">
                        <span>{ t('Episode:') }</span>
                        <span>{ props.episode.episode_number }</span>
                    </li>

                    <li className="p-episode__current-episode-list-info-item">
                        <span>{ t('Type:') }</span>
                        <span className="capitalize">{ props.episode.episode_type }</span>
                    </li>
                </ul>

                {
                    props.episode.overview &&
                    <div className="p-episode__current-episode-overview">
                        <p className="p-episode__current-episode-overview-title">
                            { t('Overview:') }
                        </p>

                        <ShowMore
                            className="p-episode__current-episode-overview-text"
                            lines={ 5 }
                        >
                            { props.episode.overview }
                        </ShowMore>
                    </div>
                }
            </Container>
        </div>
    );
}
