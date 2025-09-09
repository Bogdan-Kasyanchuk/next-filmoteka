'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import Pagination from '@/components/app/Pagination';
import TVShowCard from '@/components/ui/cards/TVShowCard';
import DataNotFound from '@/components/ui/data-display/DataNotFound';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { transformTVShowDetailsForRecommendations } from '@/helpers/transformData';
import { getRecommendationsToTVShow } from '@/services/api';

import CurrentTVShow from './CurrentTVShow';

type Props = {
    id: string;
    currentPage: number,
}

export default function Content(props: Props) {
    const { data, isPending, isFetching } = useQuery({
        queryKey: ['tv-shows', props.id, 'recommendations', props.currentPage],
        queryFn: () => getRecommendationsToTVShow(props.id, props.currentPage),
        placeholderData: keepPreviousData,
        select: (data) => {
            const transformedResults = transformTVShowDetailsForRecommendations(data);

            return {
                tvShow: transformedResults.tvShow,
                recommendations: transformedResults.recommendations,
                total_pages: data.recommendations.total_pages
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
        <Container className='p-tv-show-recommendations'>
            <CurrentTVShow
                tvShow={data.tvShow}
                id={props.id}
            />

            <Title className='p-tv-show-recommendations__title'>
                Recommendations
            </Title>

            {
                data.recommendations.length > 0
                    ? <div className='p-tv-show-recommendations__content'>
                        <ul className='p-tv-show-recommendations__list'>
                            {
                                data.recommendations.map(
                                    (tvShow) => (
                                        <li key={tvShow.id}>
                                            <TVShowCard tvShow={tvShow} />
                                        </li>
                                    )
                                )
                            }
                        </ul>

                        {
                            data.total_pages > 1 &&
                            <Pagination
                                currentPage={props.currentPage}
                                totalPages={data.total_pages}
                            />
                        }
                    </div>
                    : <DataNotFound />
            }
        </Container>
    );
}