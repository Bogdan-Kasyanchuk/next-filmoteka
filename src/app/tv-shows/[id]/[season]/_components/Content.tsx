'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import EpisodeCard from '@/components/ui/cards/EpisodeCard';
import DataNotFound from '@/components/ui/data-display/DataNotFound';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import { transformTVShowSeasonDetails } from '@/helpers/transformData';
import { getTVShowSeasonByNumber } from '@/services/api';

import CurrentSeason from './CurrentSeason';

type Props = {
    id: string
    season: string
}

export default function Content(props: Props) {
    const { data, isPending, isFetching } = useQuery({
        queryKey: ['tv-shows', props.id, props.season],
        queryFn: () => getTVShowSeasonByNumber(props.id, props.season),
        select: (data) => transformTVShowSeasonDetails(data)
    });

    if (isPending || isFetching) {
        return <Loader />;
    }

    if (!data) {
        return notFound();
    }

    return (
        <Container className='p-season'>
            <CurrentSeason
                season={data.season}
                id={props.id}
            />

            {
                data.episodes.length > 0
                    ? <ul className='p-season__list'>
                        {
                            data.episodes.map(
                                (episode, index) => (
                                    <li key={index}>
                                        <EpisodeCard episode={episode} />
                                    </li>
                                )
                            )
                        }
                    </ul>
                    : <DataNotFound />
            }
        </Container>
    );
}