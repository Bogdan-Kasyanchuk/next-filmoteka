'use client';

import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';

import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import { personsQueryKeys } from '@/helpers/queryKeys';
import { transformPersonDetails } from '@/helpers/transformData';
import { getPersonById } from '@/services/tmdb/persons';

import Gallery from './Gallery';
import PersonDetails from './PersonDetails';
import Timeline from './Timeline';

type Props = {
    id: string
};

export default function Content(props: Props) {
    const locale = useLocale();
        
    const { data, isPending, isError, error } = useQuery({
        queryKey: personsQueryKeys.personById(props.id, locale),
        queryFn: () => getPersonById(props.id, locale),
        select: data => transformPersonDetails(data)
    });

    if (isPending) {
        return <Loader />;
    }

    if (isError) {
        throw new Error(error.message);
    }

    return (
        <div className="p-person">
            <PersonDetails person={ data.person } />

            <Container className="p-person__container">
                {
                    data.images.length > 0 &&
                    <Gallery
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