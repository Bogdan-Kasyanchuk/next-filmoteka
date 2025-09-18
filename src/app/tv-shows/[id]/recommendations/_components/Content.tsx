'use client';

import { keepPreviousData, useQueries } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import CurrentTVShow from '@/components/app/CurrentTVShow';
import Pagination from '@/components/app/Pagination';
import TVShowCard from '@/components/ui/cards/TVShowCard';
import DataNotFound from '@/components/ui/data-display/DataNotFound';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { transformCurrentTVShow, transformTVShow } from '@/helpers/transformData';
import { getCurrentTVShowById, getRecommendationsTVShow } from '@/services/api';

type Props = {
    id: string;
    currentPage: number,
}

export default function Content(props: Props) {
    const data = useQueries({
        queries: [
            {
                queryKey: ['tv-shows', props.id, 'recommendations'],
                queryFn: () => getCurrentTVShowById(props.id),
            },
            {
                queryKey: ['tv-shows', props.id, 'recommendations', props.currentPage],
                queryFn: () => getRecommendationsTVShow(props.id, props.currentPage),
                placeholderData: keepPreviousData,
            },
        ],
        combine: (results) => {
            return {
                tvShow: results[0].data && transformCurrentTVShow(results[0].data),
                recommendations: {
                    tvShows: results[1].data && results[1].data.results.map(
                        (tvShow) => transformTVShow(tvShow)
                    ),
                    total_pages: results[1].data?.total_pages
                },
                pending: results.some((result) => result.isPending),
                fetching: results.some((result) => result.isFetching),
            };
        },
    });

    if (data.pending || data.fetching) {
        return <Loader />;
    }

    if (!data.tvShow || !data.recommendations.tvShows) {
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
                data.recommendations.tvShows.length > 0
                    ? <div className='p-tv-show-recommendations__content'>
                        <ul className='p-tv-show-recommendations__list'>
                            {
                                data.recommendations.tvShows.map(
                                    (tvShow) => (
                                        <li key={tvShow.id}>
                                            <TVShowCard tvShow={tvShow} />
                                        </li>
                                    )
                                )
                            }
                        </ul>

                        {
                            (data.recommendations.total_pages && data.recommendations.total_pages > 1) &&
                            <Pagination
                                currentPage={props.currentPage}
                                totalPages={data.recommendations.total_pages}
                            />
                        }
                    </div>
                    : <DataNotFound />
            }
        </Container>
    );
}