'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useExtracted, useLocale } from 'next-intl';
import { useMemo } from 'react';

import Tabs from '@/components/ui/data-display/Tabs';
import Switch from '@/components/ui/inputs/Switch';
import { MediaType } from '@/enums';
import { pagesSearchUrl } from '@/routes';
import { getPathname } from '@/services/i18n/navigation';
import { Adult } from '@/types';
import buildUrl from '@/utils/buildUrl';

type Filter = {
    label: string,
    value: 'multi' | MediaType
};

type Props = {
    type: 'multi' | MediaType,
    adult: Adult
};

export default function Filter(props: Props) {
    const searchParams = useSearchParams();
    const { push } = useRouter();
    const locale = useLocale();

    const t = useExtracted();
        
    const filters: Filter[] = useMemo(() => {
        return [
            {
                label: t('All'),
                value: 'multi'
            },
            {
                label: t('Movies'),
                value: MediaType.MOVIE
            },
            {
                label: t('TV Shows'),
                value: MediaType.TV_SHOW
            },
            {
                label: t('Persons'),
                value: MediaType.PERSON
            }
        ];
    }, [ t ]);

    const handleParamChange = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
    
        params.set(key, value);
            
        push(buildUrl(`${ getPathname({ locale, href: pagesSearchUrl() }) }/page/1/`, params));
    };
    
    return (
        <div className="p-search__filter">
            <Tabs<'multi' | MediaType>
                tabs={ filters }
                active={ props.type }
                onClick={
                    value => {
                        handleParamChange('type', value);
                    }
                }
            />

            <Switch
                label={ t('Adult') }
                checked={ props.adult === 'true' }
                onChange={
                    event => {
                        handleParamChange(
                            'adult',
                            event.currentTarget.checked ? 'true' : 'false'
                        );
                    }
                }
            />
        </div>
    );
}