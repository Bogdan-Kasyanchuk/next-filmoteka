'use client';

import { useQuery } from '@tanstack/react-query';

import Loader from '@/components/ui/data-display/Loader';
import { MediaType } from '@/enums';
import { getItemById } from '@/services/api';

type Props = {
    id: string
}

export default function Content(props: Props) {
    const { data, isFetching } = useQuery({
        queryKey: ['tvs', props.id],
        queryFn: () => getItemById(MediaType.TV, props.id),
        select: (data) => {
            return {
                data
            };
        },
    });

    return (
        <>
            {
                isFetching
                    ? <Loader />
                    : <div className='grow flex items-center justify-center text-8xl'>
                        Data tv
                    </div>
            }
        </>
    );
}