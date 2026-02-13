import { Locale } from 'next-intl';
import { cache } from 'react';

import { DataShema, PersonDetailsShema, PersonShema } from '@/shemas';

import { fetchApi } from './api';

export const getPersons = (page: number, locale: Locale) => {
    return fetchApi<DataShema<PersonShema>>(`person/popular?page=${ page }`, locale);
};

export const getPersonById = cache((id: string, locale: Locale) => {
    return fetchApi<PersonDetailsShema>(
        `person/${ id }?append_to_response=combined_credits,images,external_ids`,
        locale
    );
});