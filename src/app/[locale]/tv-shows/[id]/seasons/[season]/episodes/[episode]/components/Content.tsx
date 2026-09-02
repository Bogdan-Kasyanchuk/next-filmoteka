'use client';

import { useQueries } from '@tanstack/react-query';
import { useExtracted, useLocale } from 'next-intl';

import Persons from '@/components/app/Persons';
import CastCard from '@/components/ui/cards/CastCard';
import CrewCard from '@/components/ui/cards/CrewCard';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import { tvShowsQueryKeys } from '@/helpers/queryKeys';
import {
    transformCurrentTVShow,
    transformTVShowEpisodeDetails,
    transformTVShowSeasonDetails
} from '@/helpers/transformData';
import { getCurrentTVShowById, getTVShowEpisodeByNumber, getTVShowSeasonByNumber } from '@/services/tmdb/tvShows';

import CurrentEpisode from './CurrentEpisode';
import Gallery from './Gallery';

type Props = {
    id: string,
    season: number,
    episode: number
};

export default function Content(props: Props) {
    const locale = useLocale();

    const t = useExtracted();

    const data = useQueries({
        queries: [
            {
                queryKey: tvShowsQueryKeys.currentTvShowById(props.id, locale),
                queryFn: () => getCurrentTVShowById(props.id, locale)
            },
            {
                queryKey: tvShowsQueryKeys.seasonById(props.id, props.season, locale),
                queryFn: () => getTVShowSeasonByNumber(props.id, props.season, locale)
            },
            {
                queryKey: tvShowsQueryKeys.episodeById(props.id, props.season, props.episode, locale),
                queryFn: () => getTVShowEpisodeByNumber(props.id, props.season, props.episode, locale)
            }
        ],
        combine: results => {
            return {
                tvShow: transformCurrentTVShow(results[ 0 ].data!),
                season: transformTVShowSeasonDetails(results[ 1 ].data!),
                episode: transformTVShowEpisodeDetails(results[ 2 ].data!),
                pending: results.some(result => result.isPending),
                isError: results.some(result => result.isError),
                error: results.find(result => result.isError)?.error
            };
        }
    });

    if (data.pending) {
        return <Loader />;
    }

    if (data.isError) {
        throw new Error(data.error?.message || 'Internal server error');
    }

    return (
        <>
            <CurrentEpisode
                tvShow={
                    {
                        name: data.tvShow.name,
                        first_air_date: data.tvShow.first_air_date
                    }
                }
                season={ data.season.season.season_number }
                episode={ data.episode.episode }
                episodes={ data.season.episodes }
                tvShowId={ props.id }
            />

            <Container className="p-episode__container">
                {
                    data.episode.guest_stars.length > 0 &&
                    <Persons
                        items={ data.episode.guest_stars }
                        title={ t('Guest stars') }
                    >
                        {
                            item => <CastCard cast={ item } />
                        }
                    </Persons>
                }

                {
                    data.episode.crew.length > 0 &&
                    <Persons
                        items={ data.episode.crew }
                        title={ t('Crew') }
                    >
                        {
                            item => <CrewCard crew={ item } />
                        }
                    </Persons>
                }

                {
                    data.episode.images.length > 0 &&
                    <Gallery
                        images={ data.episode.images }
                        name={ data.episode.episode.name }
                    />
                }
            </Container>
        </>
    );
}
