'use client';

import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';

import Persons from '@/components/app/Persons';
import CastCard from '@/components/ui/cards/CastCard';
import CrewCard from '@/components/ui/cards/CrewCard';
import ErrorComponent from '@/components/ui/data-display/ErrorComponent';
import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import { moviesQueryKeys } from '@/helpers/queryKeys';
import { transformMovieDetails } from '@/helpers/transformData';
import { getMovieById } from '@/services/tmdb/movies';

import MovieDetails from './MovieDetails';

type Props = {
    id: string
};

export default function Content(props: Props) {
    const locale = useLocale();
        
    const { data, isPending, isError, error } = useQuery({
        queryKey: moviesQueryKeys.movieById(props.id, locale),
        queryFn: () => getMovieById(props.id, locale),
        select: data => transformMovieDetails(data)
    });

    if (isPending) {
        return <Loader />;
    }

    if (isError) {
        return <ErrorComponent errorMessage={ error.message } />;
    }

    return (
        <>
            <MovieDetails
                movie={ data.movie }
                id={ props.id }
            />

            {
                (data.cast.length > 0 || data.crew.length > 0) &&
                <Container className="p-movie__container">
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