'use client';

import { useQuery } from '@tanstack/react-query';

import NetworkDetailsCard from '@/components/ui/cards/NetworkDetailsCard';
import { transformNetworkDetails } from '@/helpers/transformData';
import { getNetworkById } from '@/services/api';

type Props = {
    id: string
};

export default function NetworkDetails(props: Props) {
    const { data, isPending, isError } = useQuery({
        queryKey: [ 'network', props.id ],
        queryFn: () => getNetworkById(props.id),
        select: data => {
            const result = transformNetworkDetails(data);

            if (Object.values(result).every(value => !value)) {
                return undefined;
            }

            return result;
        }
    });

    if (isPending) {
        return <div className="font-bold text-md">Loading...</div>;
    }

    if ( isError || !data) {
        return <div className="font-bold text-md">Data not found</div>; 
    }

    return (
        <NetworkDetailsCard network={ data } />
    );
}
