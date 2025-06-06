'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import Casts from '@/components/app/Casts';
import Videos from '@/components/app/Videos';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import { transformMovieDetails } from '@/helpers/transformData';
import { getMovieById } from '@/services/api';

import MovieDetails from './MovieDetails';
// import Recommendations from './Recommendations';
// import Reviews from './Reviews';

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
            <MovieDetails
                {...data.movie}
                id={props.id}
            />

            <Container className='xxl:max-w-[1440px] flex flex-col gap-y-[30px]'>
                {
                    data.cast.length > 0 &&
                    <Casts casts={data.cast} />
                }

                {
                    data.videos.length > 0 &&
                    <Videos videos={data.videos} />
                }
            </Container>

            {/* <Videos movie={data} />
            <Recommendations movie={data} />
            <Reviews movie={data} /> */}
        </div>
    );
}