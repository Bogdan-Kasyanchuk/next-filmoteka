'use client';

import { useQuery } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

import CompanyDetailsCard from '@/components/ui/cards/CompanyDetailsCard';
import { transformCompanyDetails } from '@/helpers/transformData';
import { getCompanyById } from '@/services/tmdbApi/general';

type Props = {
    id: string
};

export default function CompanyDetails(props: Props) {
    const { data, isPending, isError } = useQuery({
        queryKey: [ 'company', props.id ],
        queryFn: () => getCompanyById(props.id),
        select: data => {
            const result = transformCompanyDetails(data);

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
        <CompanyDetailsCard company={ data } />
    );
}

function Content(props: PropsWithChildren) {
    return (
        <div className="font-bold text-md">{ props.children }</div>
    );
}