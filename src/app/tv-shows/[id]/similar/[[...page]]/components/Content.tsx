'use client';

import { keepPreviousData, useQueries } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import CurrentTVShow from '@/components/app/CurrentTVShow';
import Pagination from '@/components/app/Pagination';
import TVShowCard from '@/components/ui/cards/TVShowCard';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { transformCurrentTVShow, transformTVShow } from '@/helpers/transformData';
import { getCurrentTVShowById, getSimilarTVShows } from '@/services/tmdbApi/tvShows';

type Props = {
    id: string,
    page: number
};

export default function Content(props: Props) {
    const data = useQueries({
        queries: [
            {
                queryKey: [ 'tv-shows', 'current', props.id ],
                queryFn: () => getCurrentTVShowById(props.id)
            },
            {
                queryKey: [ 'tv-shows', props.id, 'similar', props.page ],
                queryFn: () => getSimilarTVShows(props.id, props.page),
                placeholderData: keepPreviousData
            }
        ],
        combine: results => {
            return {
                tvShow: results[ 0 ].data && transformCurrentTVShow(results[ 0 ].data),
                similar: {
                    tvShows: results[ 1 ].data?.results.map(transformTVShow) ?? [],
                    total_pages: results[ 1 ].data?.total_pages ?? 1
                },
                pending: results.some(result => result.isPending),
                isError: results.some(result => result.isError)
            };
        }
    });

    if (data.pending) {
        return <Loader />;
    }

    if (data.isError || !data.tvShow || !data.similar.tvShows.length) {
        notFound();
    }

    return (
        <Container className="p-tv-show-similar">
            <CurrentTVShow
                tvShow={ data.tvShow }
                id={ props.id }
            />

            <Title className="p-tv-show-similar__title">
                Similar tv shows
            </Title>

            <div className="p-tv-show-similar__content">
                <ul className="c-media-list c-media-list--compact">
                    {
                        data.similar.tvShows.map(
                            (tvShow, index) => (
                                <li key={ tvShow.id }>
                                    <TVShowCard
                                        tvShow={ tvShow }
                                        preload={ index < 6 }
                                    />
                                </li>
                            )
                        )
                    }
                </ul>

                {
                    data.similar.total_pages > 1 &&
                    <Pagination
                        currentPage={ props.page }
                        totalPages={
                            data.similar.total_pages > 500
                                ? 500
                                : data.similar.total_pages 
                        }
                    />
                }
            </div>
        </Container>
    );
}