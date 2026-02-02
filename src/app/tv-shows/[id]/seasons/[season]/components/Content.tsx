'use client';

import { useQueries } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import EpisodeCard from '@/components/ui/cards/EpisodeCard';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import { transformCurrentTVShow, transformTVShowSeasonDetails } from '@/helpers/transformData';
import { getTVShowSeasonByNumber } from '@/services/api';
import { getCurrentTVShowByIdCached } from '@/services/cachedWrappers';

import CurrentSeason from './CurrentSeason';

type Props = {
    id: string,
    season: number
};

export default function Content(props: Props) {
    const data = useQueries({
        queries: [
            {
                queryKey: [ 'tv-shows', 'current', props.id ],
                queryFn: () => getCurrentTVShowByIdCached(props.id)
            },
            {
                queryKey: [ 'tv-shows', props.id, props.season ],
                queryFn: () => getTVShowSeasonByNumber(props.id, props.season)
            }
        ],
        combine: results => {
            return {
                tvShow: results[ 0 ].data && transformCurrentTVShow(results[ 0 ].data),
                season: results[ 1 ].data && transformTVShowSeasonDetails(results[ 1 ].data),
                pending: results.some(result => result.isPending),
                isError: results.some(result => result.isError)
            };
        }
    });

    if (data.pending) {
        return <Loader />;
    }

    if (data.isError || !data.tvShow || !data.season) {
        return notFound();
    }

    return (
        <Container className="p-season">
            <CurrentSeason
                tvShow={ data.tvShow }
                season={ data.season.season }
                id={ props.id }
            />

            <ul className="p-season__list">
                {
                    data.season.episodes.map(
                        (episode, index) => (
                            <li key={ index }>
                                <EpisodeCard episode={ episode } />
                            </li>
                        )
                    )
                }
            </ul>
        </Container>
    );
}