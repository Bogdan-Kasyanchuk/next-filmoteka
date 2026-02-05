'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import Cast from '@/components/app/Cast';
import Crew from '@/components/app/Crew';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import { transformTVShowDetails } from '@/helpers/transformData';
import { getTVShowById } from '@/services/tmdbApi/tvShows';

import Seasons from './Seasons';
import TVShowDetails from './TVShowDetails';

type Props = {
    id: string
};

export default function Content(props: Props) {
    const { data, isPending, isError } = useQuery({
        queryKey: [ 'tv-shows', props.id ],
        queryFn: () => getTVShowById(props.id),
        select: data => transformTVShowDetails(data)
    });

    if (isPending) {
        return <Loader />;
    }

    if ( isError || !data) {
        notFound();
    }

    return (
        <>
            <TVShowDetails
                tvShow={ data.tvShow }
                id={ props.id }
            />

            <Container className="p-tv-show__container">
                {
                    data.seasons.length > 0 &&
                    <Seasons
                        seasons={ data.seasons }
                        tvShowId={ props.id }
                    />
                }

                {
                    data.cast.length > 0 &&
                    <Cast cast={ data.cast } />
                }

                {
                    data.crew.length > 0 &&
                    <Crew crew={ data.crew } />
                }
            </Container>
        </>
    );
}