'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import { transformMovieDetails } from '@/helpers/transformData';
import { getMovieById } from '@/services/api';

import Casts from './Casts';
import MovieDetails from './MovieDetails';
// import Recommendations from './Recommendations';
// import Reviews from './Reviews';
// import Videos from './Videos';

type Props = {
    id: string
}

export default function Content(props: Props) {
    const { data, isPending, isFetching } = useQuery({
        queryKey: ['movies', props.id],
        queryFn: () => getMovieById(props.id),
        select: (data) => transformMovieDetails(data),
    });

    if (isPending || isFetching) {
        return <Loader />;
    }

    if (!data) {
        return notFound();
    }

    return (
        <div className='p-movie'>
            <MovieDetails {...data.movie} />

            <Container className='xxl:max-w-[1440px] flex flex-col gap-y-[30px]'>
                <Casts casts={data.cast} />
            </Container>

            {/* <Videos movie={data} />
            <Recommendations movie={data} />
            <Reviews movie={data} /> */}
        </div>
    );
}