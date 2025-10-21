'use client';

import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';

import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import { transformPersonDetails } from '@/helpers/transformData';
import { getPersonById } from '@/services/api';

import Images from './Images';
import PersonDetails from './PersonDetails';
import Timeline from './Timeline';

type Props = {
    id: string
};

export default function Content(props: Props) {
    const { data, isPending, isError } = useQuery({
        queryKey: [ 'persons', props.id ],
        queryFn: () => getPersonById(props.id),
        select: data => transformPersonDetails(data)
    });

    if (isPending) {
        return <Loader />;
    }

    if (isError || !data) {
        return notFound();
    }

    return (
        <div className="p-person">
            <PersonDetails person={ data.person } />

            <Container className="p-person__container">
                {
                    data.images.length > 0 &&
                    <Images
                        images={ data.images }
                        name={ data.person.name }
                    />
                }

                {
                    (data.cast.length > 0 || data.crew.length > 0) &&
                    <Timeline
                        cast={ data.cast }
                        crew={ data.crew }
                    />
                }
            </Container>
        </div>
    );
}