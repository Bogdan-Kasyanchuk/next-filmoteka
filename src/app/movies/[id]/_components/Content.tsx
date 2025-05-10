'use client';

import { useQuery } from '@tanstack/react-query';

import Loader from '@/components/ui/data-display/Loader';
import { MediaType } from '@/enums';
import { getItemById } from '@/services/api';
import { MovieDetailsShema } from '@/shemas';

type Props = {
    id: string
}

export default function Content(props: Props) {
    const { data, isFetching } = useQuery({
        queryKey: ['movies', props.id],
        queryFn: () => getItemById<MovieDetailsShema>(MediaType.MOVIE, props.id),
        select: (data) => {
            return {
                imdb_id: data.imdb_id,
                adult: data.adult,
                homepage: data.homepage,
                budget: data.budget,
                title: data.title || data.original_title,
                overview: data.overview,
                status: data.status,
                tagline: data.tagline,
                vote_average: data.vote_average,
                vote_count: data.vote_count,
                popularity: data.popularity,
                poster_path: data.poster_path,
                original_language: data.original_language,
                release_date: data.release_date,
                revenue: data.revenue,
                genres: data.genres.map(genre => genre.name),
                origin_country: data.origin_country,
                // production_companies: ProductionCompany[],
                // production_countries: ProductionCountry[],
                // spoken_languages: SpokenLanguage[],

            };
        },
    });

    console.log(data);

    return (
        <>
            {
                isFetching
                    ? <Loader />
                    : <div className='grow flex items-center justify-center text-8xl'>
                        Data movie
                    </div>
            }
        </>
    );
}