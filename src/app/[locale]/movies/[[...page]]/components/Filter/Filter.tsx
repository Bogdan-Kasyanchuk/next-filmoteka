'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useExtracted, useLocale } from 'next-intl';
import { useMemo } from 'react';

import Tabs from '@/components/ui/data-display/Tabs';
import { MovieType } from '@/enums';
import { pagesMoviesUrl } from '@/routes';
import { getPathname } from '@/services/i18n/navigation';
import buildUrl from '@/utils/buildUrl';

type Filter = {
    label: string,
    value: MovieType
};

type Props = {
    type: MovieType
};

export default function Filter(props: Props) {
    const searchParams = useSearchParams();
    const { push } = useRouter();
    const locale = useLocale();

    const t = useExtracted();

    const filters: Filter[] = useMemo(() => {
        return [
            {
                label: t('Now playing'),
                value: MovieType.NOW_PLAYING
            },
            {
                label: t('Popular'),
                value: MovieType.POPULAR
            },
            {
                label: t('Top rated'),
                value: MovieType.TOP_RATED
            },
            {
                label: t('Upcoming'),
                value: MovieType.UPCOMING
            }
        ];
    }, [ t ]);
    
    const handleTypeChange = (type: MovieType) => {
        const params = new URLSearchParams(searchParams);
        
        params.set('type', type);

        push(buildUrl(`${ getPathname({ locale, href: pagesMoviesUrl() }) }/page/1/`, params));
    };

    return (
        <div className="p-movies__filter">
            <Tabs<MovieType>
                tabs={ filters }
                active={ props.type }
                onClick={
                    value => {
                        handleTypeChange(value);
                    }
                }
            />
        </div>
    );
}