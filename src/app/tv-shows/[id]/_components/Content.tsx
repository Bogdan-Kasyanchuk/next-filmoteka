'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import Casts from '@/components/app/Casts';
import Crews from '@/components/app/Crews';
import Recommendations from '@/components/app/Recommendations';
import Reviews from '@/components/app/Reviews';
import Videos from '@/components/app/Videos';
import TVShowCard from '@/components/ui/cards/TVShowCard';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import { MediaType } from '@/enums';
import { transformTVShowDetails } from '@/helpers/transformData';
import { recommendationsUrl, reviewsUrl } from '@/routes';
import { getTVShowById } from '@/services/api';
import { TVShowMapper } from '@/types';

import Seasons from './Seasons';
import TVShowDetails from './TVShowDetails';

type Props = {
    id: string
};

export default function Content(props: Props) {
    const { data, isPending, isError } = useQuery({
        queryKey: [ 'tv-shows', props.id ],
        queryFn: () => getTVShowById(props.id),
        select: data => transformTVShowDetails(data)
    });

    if (isPending) {
        return <Loader />;
    }

    if (isError || !data) {
        return notFound();
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
                    <Casts casts={ data.cast } />
                }

                {
                    data.crew.length > 0 &&
                    <Crews crews={ data.crew } />
                }

                {
                    data.videos.length > 0 &&
                    <Videos videos={ data.videos } />
                }

                {
                    data.recommendations.items.length > 0 &&
                    <Recommendations<TVShowMapper>
                        recommendations={ data.recommendations }
                        item={ item => <TVShowCard tvShow={ item } /> }
                        showAllPath={ recommendationsUrl(MediaType.TV_SHOW, props.id) }
                    />
                }

                {
                    data.reviews.items.length > 0 &&
                    <Reviews
                        reviews={ data.reviews }
                        showAllPath={ reviewsUrl(MediaType.TV_SHOW, props.id) }
                    />
                }
            </Container>
        </div>
    );
}