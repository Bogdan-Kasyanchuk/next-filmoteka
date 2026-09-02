'use client';

import clsx from 'clsx';
import { useExtracted } from 'next-intl';

import { pagesEpisodeUrl } from '@/routes';
import { Link } from '@/services/i18n/navigation';
import { EpisodeMapper } from '@/types';

type Props = {
    episodes: EpisodeMapper[],
    currentEpisodeNumber: number,
    tvShowId: string,
    season: number
};

export default function EpisodeNavigation(props: Props) {
    const t = useExtracted();

    const currentIndex = props.episodes.findIndex(
        episode => episode.episode_number === props.currentEpisodeNumber
    );

    const prevEpisode = currentIndex > 0
        ? props.episodes[ currentIndex - 1 ]
        : null;

    const nextEpisode = currentIndex >= 0 && currentIndex < props.episodes.length - 1
        ? props.episodes[ currentIndex + 1 ]
        : null;

    return (
        <div className="p-episode__navigation">
            <NavigationLink
                type="prev"
                label={ t('Previous episode') }
                episode={ prevEpisode }
                tvShowId={ props.tvShowId }
                season={ props.season }
            />

            <NavigationLink
                type="next"
                label={ t('Next episode') }
                episode={ nextEpisode }
                tvShowId={ props.tvShowId }
                season={ props.season }
            />
        </div>
    );
}

type NavigationLinkProps = {
    type: 'prev' | 'next',
    label: string,
    episode: EpisodeMapper | null,
    tvShowId: string,
    season: number
};

function NavigationLink(props: NavigationLinkProps) {
    const className = clsx(
        'p-episode__navigation-link',
        props.type === 'prev'
            ? 'p-episode__navigation-link--prev'
            : 'p-episode__navigation-link--next'
    );

    if (!props.episode) {
        return (
            <span
                className={ className }
                aria-disabled="true"
            >
                { props.label }
            </span>
        );
    }

    return (
        <Link
            href={ pagesEpisodeUrl(props.tvShowId, props.season, props.episode.episode_number) }
            className={ className }
            title={ props.episode.name }
        >
            { props.label }
        </Link>
    );
}
