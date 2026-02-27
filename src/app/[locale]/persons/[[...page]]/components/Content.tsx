'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';

import Pagination from '@/components/app/Pagination';
import PersonCard from '@/components/ui/cards/PersonCard';
import Loader from '@/components/ui/data-display/Loader';
import { personsQueryKeys } from '@/helpers/queryKeys';
import { transformPerson } from '@/helpers/transformData';
import { getPersons } from '@/services/tmdb/persons';

type Props = {
    page: number
};

export default function Content(props: Props) {
    const locale = useLocale();
        
    const { data, isPending, isError, error } = useQuery({
        queryKey: personsQueryKeys.allPersons(props.page, locale),
        queryFn: () => getPersons(props.page, locale),
        placeholderData: keepPreviousData,
        select: data => ({
            persons: data.results.map(transformPerson),
            total_pages: data.total_pages
        })
    });

    if (isPending) {
        return <Loader />;
    }

    if (isError) {
        throw new Error(error.message);
    }

    return (
        <div className="p-persons__content">
            <ul className="c-media-list">
                {
                    data.persons.map(
                        (person, index) => (
                            <li key={ person.id }>
                                <PersonCard
                                    person={ person }
                                    preload={ index < 6 }
                                />
                            </li>
                        )
                    )
                }
            </ul>

            {
                data.total_pages > 1 &&
                <Pagination
                    currentPage={ props.page }
                    totalPages={ data.total_pages > 500 ? 500 : data.total_pages }
                />
            }
        </div>
    );
}