'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import { transformTVShowDetails } from '@/helpers/transformData';
import { getTVShowById } from '@/services/api';

import Casts from './Casts';
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
            <TVShowDetails {...data.tvShow} />

            <Container className='xxl:max-w-[1440px] flex flex-col gap-y-[30px]'>
                <Casts casts={data.cast} />
            </Container>
        </div>
    );
}