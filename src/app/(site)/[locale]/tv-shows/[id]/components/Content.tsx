'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Suspense } from 'react';

import Cast from '@/components/app/Cast';
import Crew from '@/components/app/Crew';
import { RecommendationsSkeleton } from '@/components/app/Recommendations';
import Reviews, { ReviewsSkeleton } from '@/components/app/Reviews';
import Videos, { VideosSkeleton } from '@/components/app/Videos';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import { MediaType } from '@/enums';
import { tvShowsQueryKeys } from '@/helpers/queryKeys';
import { transformTVShowDetails } from '@/helpers/transformData';
import { getTVShowById } from '@/services/tmdb/tvShows';

import Recommendations from './Recommendations';
import Seasons from './Seasons';
import TVShowDetails from './TVShowDetails';

type Props = {
    id: string
};

export default function Content(props: Props) {
    const locale = useLocale();
        
    const { data, isPending, isError } = useQuery({
        queryKey: tvShowsQueryKeys.tvShowById(props.id, locale),
        queryFn: () => getTVShowById(props.id, locale),
        select: data => transformTVShowDetails(data)
    });

    if (isPending) {
        return <Loader />;
    }

    if ( isError || !data) {
        notFound();
    }

    return (
        <div className="p-tv-show">
            <TVShowDetails
                tvShow={ data.tvShow }
                id={ props.id }
            />

            <Container className="p-tv-show__container">
                {
                    data.seasons.length > 0 &&
                    <Seasons
                        seasons={ data.seasons }
                        tvShowId={ props.id }
                    />
                }

                {
                    data.cast.length > 0 &&
                    <Cast cast={ data.cast } />
                }

                {
                    data.crew.length > 0 &&
                    <Crew crew={ data.crew } />
                }

                <Suspense fallback={ <VideosSkeleton /> }>
                    <Videos
                        type={ MediaType.TV_SHOW }
                        id={ props.id }
                    />
                </Suspense>
            
                <Suspense fallback={ <RecommendationsSkeleton /> }>
                    <Recommendations id={ props.id } />
                </Suspense>
            
                <Suspense fallback={ <ReviewsSkeleton /> }>
                    <Reviews
                        type={ MediaType.TV_SHOW }
                        id={ props.id }
                    />
                </Suspense>
            </Container>
        </div>
    );
}