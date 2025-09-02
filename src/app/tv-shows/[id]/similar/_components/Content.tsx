'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import TVShowCard from '@/components/ui/cards/TVShowCard';
import DataNotFound from '@/components/ui/data-display/DataNotFound';
import Loader from '@/components/ui/data-display/Loader';
import Pagination from '@/components/ui/data-display/Pagination';
import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { transformTVShowDetailsForSimilar } from '@/helpers/transformData';
import { getSimilarToTVShow } from '@/services/api';

import CurrentTVShow from './CurrentTVShow';

type Props = {
    id: string;
    currentPage: number,
}

export default function Content(props: Props) {
    const { data, isPending, isFetching } = useQuery({
        queryKey: ['tv-shows', props.id, 'similar', props.currentPage],
        queryFn: () => getSimilarToTVShow(props.id, props.currentPage),
        placeholderData: keepPreviousData,
        select: (data) => {
            const transformedResults = transformTVShowDetailsForSimilar(data);

            return {
                tvShow: transformedResults.tvShow,
                similar: transformedResults.similar,
                total_pages: data.similar.total_pages
            };
        },
    });

    if (isPending || isFetching) {
        return <Loader />;
    }

    if (!data) {
        return notFound();
    }

    return (
        <Container className='p-tv-show-similar'>
            <CurrentTVShow
                tvShow={data.tvShow}
                id={props.id}
            />

            <Title className='font-bold uppercase text-center'>
                Similar
            </Title>

            {
                data.similar.length > 0
                    ? <div className='p-tv-show-similar__content'>
                        <ul className='p-tv-show-similar__media-list'>
                            {
                                data.similar.map(
                                    (tvShow) => (
                                        <li key={tvShow.id}>
                                            <TVShowCard tvShow={tvShow} />
                                        </li>
                                    )
                                )
                            }
                        </ul>

                        <Pagination
                            currentPage={props.currentPage}
                            totalPages={data.total_pages}
                        />
                    </div>
                    : <DataNotFound />
            }
        </Container>
    );
}