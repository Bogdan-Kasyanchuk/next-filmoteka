'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import EpisodeCard from '@/components/ui/cards/EpisodeCard';
import FailedLoadData from '@/components/ui/data-display/FailedLoadData';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import { transformTVShowSeasonDetails } from '@/helpers/transformData';
import { getTVShowSeasonByNumber } from '@/services/api';

import CurrentSeason from './CurrentSeason';

type Props = {
    id: string,
    season: string
};

export default function Content(props: Props) {
    const { data, isPending, isError, error } = useQuery({
        queryKey: [ 'tv-shows', props.id, props.season ],
        queryFn: () => getTVShowSeasonByNumber(props.id, props.season),
        select: data => transformTVShowSeasonDetails(data)
    });

    if (isPending) {
        return <Loader />;
    }

    if (isError) {
        return (
            <FailedLoadData>{ error.message }</FailedLoadData>
        );
    }

    if (!data || !data.episodes.length) {
        return notFound();
    }

    return (
        <Container className="p-season">
            <CurrentSeason
                season={ data.season }
                id={ props.id }
            />

            <ul className="p-season__list">
                {
                    data.episodes.map(
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