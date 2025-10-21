'use client';

import { useQuery } from '@tanstack/react-query';

import ProductionCompanyDetailsCard from '@/components/ui/cards/ProductionCompanyDetailsCard';
import { transformProductionCompanyDetails } from '@/helpers/transformData';
import { getProductionCompanyById } from '@/services/api';

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
        return <div className="font-bold text-md">Loading...</div>;
    }

    if ( isError || !data) {
        return <div className="font-bold text-md">Data not found</div>; 
    }

    return (
        <ProductionCompanyDetailsCard company={ data } />
    );
}
