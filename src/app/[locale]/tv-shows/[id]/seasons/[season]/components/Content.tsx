'use client';

import { useQueries } from '@tanstack/react-query';
import { useLocale } from 'next-intl';

import EpisodeCard from '@/components/ui/cards/EpisodeCard';
import ErrorComponent from '@/components/ui/data-display/ErrorComponent';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import { tvShowsQueryKeys } from '@/helpers/queryKeys';
import { transformCurrentTVShow, transformTVShowSeasonDetails } from '@/helpers/transformData';
import { getCurrentTVShowById, getTVShowSeasonByNumber } from '@/services/tmdb/tvShows';

import CurrentSeason from './CurrentSeason';

type Props = {
    id: string,
    season: number
};

export default function Content(props: Props) {
    const locale = useLocale();
        
    const data = useQueries({
        queries: [
            {
                queryKey: tvShowsQueryKeys.currentTvShowById(props.id, locale),
                queryFn: () => getCurrentTVShowById(props.id, locale)
            },
            {
                queryKey: tvShowsQueryKeys.seasonById(props.id, props.season, locale),
                queryFn: () => getTVShowSeasonByNumber(props.id, props.season, locale)
            }
        ],
        combine: results => {
            return {
                tvShow: transformCurrentTVShow(results[ 0 ].data!),
                season: transformTVShowSeasonDetails(results[ 1 ].data!),
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
        return <ErrorComponent errorMessage={ data.error?.message } />;
    }

    return (
        <Container className="p-season">
            <CurrentSeason
                tvShow={
                    {
                        name: data.tvShow.name,
                        first_air_date: data.tvShow.first_air_date
                    } 
                }
                season={ data.season.season }
                id={ props.id }
            />

            <ul className="p-season__list">
                {
                    data.season.episodes.map(
                        (episode, index) => (
                            <li key={ index }>
                                <EpisodeCard
                                    episode={ episode }
                                    preload={ index < 6 }
                                />
                            </li>
                        )
                    )
                }
            </ul>
        </Container>
    );
}