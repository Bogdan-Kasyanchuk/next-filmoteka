'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import Loader from '@/components/ui/data-display/Loader';
import { transformMovieDetails } from '@/helpers/transformData';
import { getMovieById } from '@/services/api';

// import Casts from './Casts';
import MovieDetails from './MovieDetails';
// import Recommendations from './Recommendations';
// import Reviews from './Reviews';
// import Videos from './Videos';

type Props = {
    id: string
}

export default function Content(props: Props) {
    const { data, isFetching } = useQuery({
        queryKey: ['movies', props.id],
        queryFn: () => getMovieById(props.id),
        select: (data) => transformMovieDetails(data),
    });

    if (isFetching) {
        return <Loader />;
    }

    if (!data) {
        return notFound();
    }

    return (
        <div className='p-movie'>
            <MovieDetails {...data.movie} />
            {/* <Casts casts={data} />
            <Videos movie={data} />
            <Recommendations movie={data} />
            <Reviews movie={data} /> */}
        </div>
    );
}