'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import MovieDetailsCard from '@/components/ui/cards/MovieDetailsCard';
import Loader from '@/components/ui/data-display/Loader';
import { MediaType } from '@/enums';
import { transformedMovieDetails } from '@/helpers/transformedData';
import { getItemById } from '@/services/api';
import { MovieDetailsShema } from '@/shemas';

type Props = {
    id: string
}

export default function Content(props: Props) {
    const { data, isFetching } = useQuery({
        queryKey: ['movies', props.id],
        queryFn: () => getItemById<MovieDetailsShema>(MediaType.MOVIE, props.id),
        select: (data) => transformedMovieDetails(data)
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