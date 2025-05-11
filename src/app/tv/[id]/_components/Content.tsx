'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import TVDetailsCard from '@/components/ui/cards/TVDetailsCard';
import Loader from '@/components/ui/data-display/Loader';
import { MediaType } from '@/enums';
import { transformedTVDetails } from '@/helpers/transformedData';
import { getItemById } from '@/services/api';
import { TVDetailsShema } from '@/shemas';

type Props = {
    id: string
}

export default function Content(props: Props) {
    const { data, isFetching } = useQuery({
        queryKey: ['tvs', props.id],
        queryFn: () => getItemById<TVDetailsShema>(MediaType.TV, props.id),
        select: (data) => transformedTVDetails(data)
    });
    console.log(data);

    return (
        <>
            {
                isFetching
                    ? <Loader />
                    : !data
                        ? notFound()
                        : <TVDetailsCard tv={data} />
            }
        </>
    );
}