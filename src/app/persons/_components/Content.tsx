'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import Pagination from '@/components/app/Pagination';
import PersonCard from '@/components/ui/cards/PersonCard';
import DataNotFound from '@/components/ui/data-display/DataNotFound';
import Loader from '@/components/ui/data-display/Loader';
import { transformPerson } from '@/helpers/transformData';
import { getPersons } from '@/services/api';

type Props = {
    currentPage: number,
}

export default function Content(props: Props) {
    const { data, isPending, isFetching } = useQuery({
        queryKey: ['persons', props.currentPage],
        queryFn: () => getPersons(props.currentPage),
        placeholderData: keepPreviousData,
        select: (data) => {
            const transformedResults = data.results.map(
                (person) => transformPerson(person));

            return {
                persons: transformedResults,
                total_pages: data.total_pages
            };
        },
    });

    return (
        <>
            {
                isPending || isFetching
                    ? <Loader />
                    : data && data.persons.length > 0
                        ? <div className='p-persons__content'>
                            <ul className='p-persons__list'>
                                {
                                    data.persons.map(
                                        (person) => (
                                            <li key={person.id}>
                                                <PersonCard person={person} />
                                            </li>
                                        )
                                    )
                                }
                            </ul>

                            {
                                data.total_pages > 1 &&
                                <Pagination
                                    currentPage={props.currentPage}
                                    totalPages={data.total_pages}
                                />
                            }
                        </div>
                        : <DataNotFound />
            }
        </>
    );
}