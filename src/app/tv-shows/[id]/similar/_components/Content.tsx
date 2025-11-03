'use client';

import { keepPreviousData, useQueries } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import CurrentTVShow from '@/components/app/CurrentTVShow';
import Pagination from '@/components/app/Pagination';
import TVShowCard from '@/components/ui/cards/TVShowCard';
import FailedLoadData from '@/components/ui/data-display/FailedLoadData';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { transformCurrentTVShow, transformTVShow } from '@/helpers/transformData';
import { getCurrentTVShowById, getSimilarTVShow } from '@/services/api';

type Props = {
    id: string,
    currentPage: number
};

export default function Content(props: Props) {
    const data = useQueries({
        queries: [
            {
                queryKey: [ 'tv-shows', 'current', props.id ],
                queryFn: () => getCurrentTVShowById(props.id)
            },
            {
                queryKey: [ 'tv-shows', props.id, 'similar', props.currentPage ],
                queryFn: () => getSimilarTVShow(props.id, props.currentPage),
                placeholderData: keepPreviousData
            }
        ],
        combine: results => {
            let error = { 
                isError: false,
                message: ''
            };

            results.forEach(result => {
                if (result.isError) {
                    error = {
                        isError: result.isError,
                        message: result.error.message
                    };
                }
            });
            
            return {
                tvShow: results[ 0 ].data && transformCurrentTVShow(results[ 0 ].data),
                similar: {
                    tvShows: results[ 1 ].data?.results.map(transformTVShow) ?? [],
                    total_pages: results[ 1 ].data?.total_pages ?? 0
                },
                pending: results.some(result => result.isPending),
                error
            };
        }
    });

    if (data.pending) {
        return <Loader />;
    }

    if (data.error.isError) {
        return (
            <FailedLoadData>{ data.error.message }</FailedLoadData>
        );
    }

    if (!data.tvShow || !data.similar.tvShows.length) {
        return notFound();
    }

    return (
        <Container className="p-tv-show-similar">
            <CurrentTVShow
                tvShow={ data.tvShow }
                id={ props.id }
            />

            <Title className="p-tv-show-similar__title">
                Similar
            </Title>

            <div className="p-tv-show-similar__content">
                <ul className="p-tv-show-similar__list">
                    {
                        data.similar.tvShows.map(
                            tvShow => (
                                <li key={ tvShow.id }>
                                    <TVShowCard tvShow={ tvShow } />
                                </li>
                            )
                        )
                    }
                </ul>

                {
                    data.similar.total_pages > 1 &&
                    <Pagination
                        currentPage={ props.currentPage }
                        totalPages={ data.similar.total_pages }
                    />
                }
            </div>
        </Container>
    );
}