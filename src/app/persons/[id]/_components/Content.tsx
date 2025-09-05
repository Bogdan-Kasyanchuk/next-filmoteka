'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import { transformPersonDetails } from '@/helpers/transformData';
import { getPersonById } from '@/services/api';

import PersonDetails from './PersonDetails';

type Props = {
    id: string
}

export default function Content(props: Props) {
    const { data, isPending, isFetching } = useQuery({
        queryKey: ['persons', props.id],
        queryFn: () => getPersonById(props.id),
        select: (data) => transformPersonDetails(data),
    });

    if (isPending || isFetching) {
        return <Loader />;
    }

    if (!data) {
        return notFound();
    }

    return (
        <div className='p-person'>
            <PersonDetails {...data.person} />

            <Container className='p-person__container'>
                {
                    data.cast.length > 0 &&
                    <div>Cast</div>
                }

                {
                    data.crew.length > 0 &&
                    <div>Crew</div>
                }
            </Container>
        </div>
    );
}