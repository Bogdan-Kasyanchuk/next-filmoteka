'use client';

import { useQuery } from '@tanstack/react-query';
import { useExtracted, useLocale } from 'next-intl';
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

    const t = useExtracted();
        
    const { data, isPending, isError, error } = useQuery({
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

    if (isError) {
        return (
            <Content>{ error.message }</Content>
        );
    }

    if (!data) {
        return (
            <Content>{ t('Data not found') }</Content>
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