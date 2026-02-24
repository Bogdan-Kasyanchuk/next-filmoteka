import { Metadata } from 'next';
import { getExtracted } from 'next-intl/server';

import Error404 from '@/components/ui/data-display/Error404';

export async function generateMetadata(): Promise<Metadata> {
    const t = await getExtracted();
        
    return {
        title: '404',
        description: t('The page you are looking for does not exist.')
    };
}

export default function NotFound() {
    return <Error404 />;
}