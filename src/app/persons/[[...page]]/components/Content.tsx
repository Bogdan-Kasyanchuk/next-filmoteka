'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import Pagination from '@/components/app/Pagination';
import PersonCard from '@/components/ui/cards/PersonCard';
import Loader from '@/components/ui/data-display/Loader';
import { transformPerson } from '@/helpers/transformData';
import { getPersons } from '@/services/tmdbApi/persons';

type Props = {
    page: number
};

export default function Content(props: Props) {
    const { data, isPending, isError } = useQuery({
        queryKey: [ 'persons', props.page ],
        queryFn: () => getPersons(props.page),
        placeholderData: keepPreviousData,
        select: data => ({
            persons: data.results.map(transformPerson),
            total_pages: data.total_pages
        })
    });

    if (isPending) {
        return <Loader />;
    }

    if (isError || !data || !data.persons.length) {
        notFound();
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