import { Locale } from 'next-intl';
import { cache } from 'react';

import { DataShema, PersonDetailsShema, PersonShema } from '@/shemas';

import { fetchApi } from './api';

export const getPersons = async (page: number, locale: Locale) => {
    return fetchApi<DataShema<PersonShema>>('person/popular', locale, { params: { page } });
};

export const getPersonById = cache(async (id: string, locale: Locale) => {
    return fetchApi<PersonDetailsShema>(
        `person/${ id }`,
        locale,
        { params: { append_to_response: 'combined_credits,images,external_ids' } }
    );
});