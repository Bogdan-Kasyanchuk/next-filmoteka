'use client';

import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { PropsWithChildren } from 'react';

import CompanyDetailsCard from '@/components/ui/cards/CompanyDetailsCard';
import { generalQueryKeys } from '@/helpers/queryKeys';
import { transformCompanyDetails } from '@/helpers/transformData';
import { getCompanyById } from '@/services/tmdb/general';

type Props = {
    id: string
};

export default function CompanyDetails(props: Props) {
    const locale = useLocale();
        
    const { data, isPending, isError } = useQuery({
        queryKey: generalQueryKeys.company(props.id, locale),
        queryFn: () => getCompanyById(props.id, locale),
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