'use client';

import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';

import Persons from '@/components/app/Persons';
import CastCard from '@/components/ui/cards/CastCard';
import CrewCard from '@/components/ui/cards/CrewCard';
import ErrorComponent from '@/components/ui/data-display/ErrorComponent';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import { tvShowsQueryKeys } from '@/helpers/queryKeys';
import { transformTVShowDetails } from '@/helpers/transformData';
import { getTVShowById } from '@/services/tmdb/tvShows';

import Seasons from './Seasons';
import TVShowDetails from './TVShowDetails';

type Props = {
    id: string
};

export default function Content(props: Props) {
    const locale = useLocale();
        
    const { data, isPending, isError, error } = useQuery({
        queryKey: tvShowsQueryKeys.tvShowById(props.id, locale),
        queryFn: () => getTVShowById(props.id, locale),
        select: data => transformTVShowDetails(data)
    });

    if (isPending) {
        return <Loader />;
    }

    if (isError) {
        return <ErrorComponent errorMessage={ error.message } />;
    }

    return (
        <>
            <TVShowDetails
                tvShow={ data.tvShow }
                id={ props.id }
            />

            {
                (data.seasons.length > 0 || data.cast.length > 0 || data.crew.length > 0) &&
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
                        <Persons items={ data.cast }>
                            {
                                item => <CastCard cast={ item } />
                            }
                        </Persons>
                    }
                    
                    {
                        data.crew.length > 0 &&
                        <Persons items={ data.crew }>
                            {
                                item => <CrewCard crew={ item } />
                            }
                        </Persons>
                    }
                </Container>
            }
        </>
    );
}