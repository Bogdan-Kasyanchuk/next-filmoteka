'use client';

import { useQuery } from '@tanstack/react-query';
import { useExtracted, useLocale } from 'next-intl';
import { PropsWithChildren } from 'react';

import NetworkDetailsCard from '@/components/ui/cards/NetworkDetailsCard';
import { generalQueryKeys } from '@/helpers/queryKeys';
import { transformNetworkDetails } from '@/helpers/transformData';
import { getNetworkById } from '@/services/tmdb/general';

type Props = {
    id: string
};

export default function NetworkDetails(props: Props) {
    const locale = useLocale();

    const t = useExtracted();
        
    const { data, isPending, isError } = useQuery({
        queryKey: generalQueryKeys.network(props.id, locale),
        queryFn: () => getNetworkById(props.id, locale),
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
            <Content>{ t('Data not found') }</Content>
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