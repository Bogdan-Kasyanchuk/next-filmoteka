'use client';

import { useQueries } from '@tanstack/react-query';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import MovieCard from '@/components/ui/cards/MovieCard';
import PersonCard from '@/components/ui/cards/PersonCard';
import TVShowCard from '@/components/ui/cards/TVShowCard';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { MediaType, TimeType } from '@/enums';
import { transformMovie, transformPerson, transformTVShow } from '@/helpers/transformData';
import { pagesTrendingDayUrl, pagesTrendingWeekUrl } from '@/routes';
import { getTrendings } from '@/services/tmdbApi/general';
import { MovieMapper, PersonMapper, TVShowMapper } from '@/types';

export default function Content() {
    const data = useQueries({
        queries: [
            {
                queryKey: [ 'trendings', 'all', TimeType.DAY ],
                queryFn: () => getTrendings('all', TimeType.DAY, 1)
            },
            {
                queryKey: [ 'trendings', 'all', TimeType.WEEK ],
                queryFn: () => getTrendings('all', TimeType.WEEK, 1)
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
                today: {
                    items: results[ 0 ].data?.results.map(
                        result => {
                            switch (result.media_type) {
                                case MediaType.MOVIE:
                                    return transformMovie(result);
                                case MediaType.TV_SHOW:
                                    return transformTVShow(result);
                                case MediaType.PERSON:
                                    return transformPerson(result);
                            }
                        }) ?? [],
                    total_pages: results[ 0 ].data?.total_pages ?? 0
                },
                week: {
                    items: results[ 1 ].data?.results.map(
                        result => {
                            switch (result.media_type) {
                                case MediaType.MOVIE:
                                    return transformMovie(result);
                                case MediaType.TV_SHOW:
                                    return transformTVShow(result);
                                case MediaType.PERSON:
                                    return transformPerson(result);
                            }
                        }) ?? [],
                    total_pages: results[ 1 ].data?.total_pages ?? 0
                },
                isPending: results.some(result => result.isPending),
                error
            };
        }
    });

    if (data.isPending) {
        return <Loader />;
    }

    if (data.error.isError || !data.today.items.length || !data.week.items.length) {
        notFound();
    }

    return (
        <Container className="p-home">
            {
                data.today.items.length > 0 &&
                <div className="p-home__block">
                    <Title className="p-home__title">
                        Trending today
                    </Title>

                    <ul className="c-media-list">
                        {
                            data.today.items.map(
                                (item, i) => (
                                    <li key={ item.id }>
                                        <Card
                                            result={ item }
                                            priority={ i < 4 }
                                        />
                                    </li>
                                )
                            )
                        }
                    </ul>

                    {
                        data.today.total_pages > 1 &&
                        <Link
                            href={ pagesTrendingDayUrl() }
                            className="p-home__show-all-button"
                        >
                            Show all trending today
                        </Link>
                    }
                </div>
            }

            {
                data.week.items.length > 0 &&
                <div className="p-home__block">
                    <Title className="p-home__title">
                        Trending this week
                    </Title>

                    <ul className="c-media-list">
                        {
                            data.week.items.map(
                                (item, i) => (
                                    <li key={ item.id }>
                                        <Card
                                            result={ item }
                                            priority={ !data.today.items.length && i < 4 }
                                        />
                                    </li>
                                )
                            )
                        }
                    </ul>

                    {
                        data.week.total_pages > 1 &&
                        <Link
                            href={ pagesTrendingWeekUrl() }
                            className="p-home__show-all-button"
                        >
                            Show all trending this week
                        </Link>
                    }
                </div>
            }

        </Container>
    );
}

type CardProps = {
    result: MovieMapper | TVShowMapper | PersonMapper,
    priority?: boolean
};

function Card(props: CardProps) {
    switch (props.result.media_type) {
        case MediaType.MOVIE:
            return (
                <MovieCard
                    movie={ props.result }
                    priority={ props.priority }
                />
            );

        case MediaType.TV_SHOW:
            return (
                <TVShowCard
                    tvShow={ props.result }
                    priority={ props.priority }
                />
            );

        case MediaType.PERSON:
            return (
                <PersonCard
                    person={ props.result }
                    priority={ props.priority }
                />
            );
    }
}