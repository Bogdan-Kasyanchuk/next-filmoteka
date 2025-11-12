'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import Pagination from '@/components/app/Pagination';
import PersonCard from '@/components/ui/cards/PersonCard';
import DataNotFound from '@/components/ui/data-display/DataNotFound';
import FailedLoadData from '@/components/ui/data-display/FailedLoadData';
import Loader from '@/components/ui/data-display/Loader';
import { transformPerson } from '@/helpers/transformData';
import { getPersons } from '@/services/api';

type Props = {
    page: number
};

export default function Content(props: Props) {
    const { data, isPending, isError, error } = useQuery({
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

    if (isError) {
        return (
            <FailedLoadData>{ error.message }</FailedLoadData>
        );
    }

    if (!data || !data.persons.length) {
        return <DataNotFound />;
    }

    return (
        <div className="p-persons__content">
            <ul className="p-persons__list">
                {
                    data.persons.map(
                        person => (
                            <li key={ person.id }>
                                <PersonCard person={ person } />
                            </li>
                        )
                    )
                }
            </ul>

            {
                data.total_pages > 1 &&
                <Pagination
                    currentPage={ props.page }
                    totalPages={ data.total_pages }
                />
            }
        </div>
    );
}