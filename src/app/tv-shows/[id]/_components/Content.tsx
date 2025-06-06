'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import Casts from '@/components/app/Casts';
import Videos from '@/components/app/Videos';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import { transformTVShowDetails } from '@/helpers/transformData';
import { getTVShowById } from '@/services/api';

import Seasons from './Seasons';
import TVShowDetails from './TVShowDetails';

type Props = {
    id: string
}

export default function Content(props: Props) {
    const { data, isPending, isFetching } = useQuery({
        queryKey: ['tv-shows', props.id],
        queryFn: () => getTVShowById(props.id),
        select: (data) => transformTVShowDetails(data)
    });

    if (isPending || isFetching) {
        return <Loader />;
    }

    if (!data) {
        return notFound();
    }

    return (
        <div className='p-tv-show'>
            <TVShowDetails
                {...data.tvShow}
                id={props.id}
            />

            <Container className='xxl:max-w-[1440px] flex flex-col gap-y-[30px]'>
                {
                    data.seasons.length > 0 &&
                    <Seasons
                        seasons={data.seasons}
                        tvShowId={props.id}
                    />
                }

                {
                    data.cast.length > 0 &&
                    <Casts casts={data.cast} />
                }

                {
                    data.videos.length > 0 &&
                    <Videos videos={data.videos} />
                }
            </Container>
        </div>
    );
}