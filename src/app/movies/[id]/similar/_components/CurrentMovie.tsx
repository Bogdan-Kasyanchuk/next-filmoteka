'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { IMG_SIZES, PARAMETERS } from '@/helpers/parameters';
import { transformMovieDetails } from '@/helpers/transformData';
import { getMovieById } from '@/services/api';
import { formatDate } from '@/utils/formateDate';

type Props = {
    id: string;
}

export default function CurrentMovie(props: Props) {
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
        <Container className='flex items-center gap-5'>
            <div className='w-[100px] h-[150px] relative'>
                <Image
                    src={
                        data.movie.poster_path
                            ? `${PARAMETERS.URL_IMG}${IMG_SIZES.MEDIA_CARD_DETAILS_COVER}${data.movie.poster_path}`
                            : '/img/poster-not-available.jpg'
                    }
                    sizes="400px"
                    alt={data.movie.title}
                    fill
                />
            </div>
            <Title className='с-movie-details__title'>
                {data.movie.title}&nbsp;({formatDate(data.movie.release_date, 'YYYY')})
            </Title>
        </Container>
    );
}