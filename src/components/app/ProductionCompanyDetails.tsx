'use client';

import { useQuery } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

import ProductionCompanyDetailsCard from '@/components/ui/cards/ProductionCompanyDetailsCard';
import { transformProductionCompanyDetails } from '@/helpers/transformData';
import { getProductionCompanyById } from '@/services/tmdbApi/general';

type Props = {
    id: string
};

export default function ProductionCompanyDetails(props: Props) {
    const { data, isPending, isError } = useQuery({
        queryKey: [ 'production-company', props.id ],
        queryFn: () => getProductionCompanyById(props.id),
        select: data => {
            const result = transformProductionCompanyDetails(data);

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
        <ProductionCompanyDetailsCard company={ data } />
    );
}

function Content(props: PropsWithChildren) {
    return (
        <div className="font-bold text-md">{ props.children }</div>
    );
}