'use client';

import { useQuery } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

import ProductionCompanyDetailsCard from '@/components/ui/cards/ProductionCompanyDetailsCard';
import { transformProductionCompanyDetails } from '@/helpers/transformData';
import { ProductionCompanyDetailsShema } from '@/shemas';

type Props = {
    id: string
};

export default function ProductionCompanyDetails(props: Props) {
    const { data, isPending, isError, error } = useQuery({
        queryKey: [ 'production-company', props.id ],
        queryFn: async () => {
            const res = await fetch(`/api/production-companies/${ props.id }`);

            if (!res.ok) {
                throw new Error(await res.json() as string);
            }

            return await res.json() as ProductionCompanyDetailsShema;
        },
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

    if (isError) {
        return (
            <Content>{ error.message }</Content>
        );
    }

    if (!data) {
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