'use client';

import { useQuery } from '@tanstack/react-query';

import NetworkDetailsCard from '@/components/ui/cards/NetworkDetailsCard';
import { transformNetworkDetails } from '@/helpers/transformData';
import { getNetworkById } from '@/services/api';

type Props = {
    id: number
};

export default function NetworkDetails(props: Props) {
    const { data, isPending, isFetching } = useQuery({
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

    if (isPending || isFetching) {
        return <div className="font-bold text-md">Loading...</div>;
    }

    if (!data) {
        return <div className="font-bold text-md">Data not found</div>; 
    }

    return (
        <NetworkDetailsCard network={ data } />
    );
}
