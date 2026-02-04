'use client';

import { useQuery } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

import NetworkDetailsCard from '@/components/ui/cards/NetworkDetailsCard';
import { transformNetworkDetails } from '@/helpers/transformData';
import { getNetworkById } from '@/services/tmdbApi/general';

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
        return (
            <Content>Loading...</Content>
        );
    }

    if (isError || !data) {
        return (
            <Content>Data not found</Content>
        );
    }

    return (
        <NetworkDetailsCard network={ data } />
    );
}

function Content(props: PropsWithChildren) {
    return (
        <div className="font-bold text-md">{ props.children }</div>
    );
}