'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import Loader from '@/components/ui/data-display/Loader';
import { transformTVShowDetails } from '@/helpers/transformData';
import { getTVShowById } from '@/services/api';

import TVShowDetails from './TVShowDetails';

type Props = {
    id: string
}

export default function Content(props: Props) {
    const { data, isFetching } = useQuery({
        queryKey: ['tv-shows', props.id],
        queryFn: () => getTVShowById(props.id),
        select: (data) => transformTVShowDetails(data)
    });

    if (isFetching) {
        return <Loader />;
    }

    if (!data) {
        return notFound();
    }

    return (
        <div className='p-tv-show'>
            <TVShowDetails {...data.tvShow} />
        </div>
    );
}