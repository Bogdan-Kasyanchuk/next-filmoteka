'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import MovieDetailsCard from '@/components/ui/cards/MovieDetailsCard';
import Loader from '@/components/ui/data-display/Loader';
import { transformedMovieDetails } from '@/helpers/transformedData';
import { getMovieById } from '@/services/api';

type Props = {
    id: string
}

export default function Content(props: Props) {
    const { data, isFetching } = useQuery({
        queryKey: ['movies', props.id],
        queryFn: () => getMovieById(props.id),
        select: (data) => transformedMovieDetails(data),
    });

    return (
        <>
            {
                isFetching
                    ? <Loader />
                    : !data
                        ? notFound()
                        : <MovieDetailsCard movie={data} />
            }
        </>
    );
}