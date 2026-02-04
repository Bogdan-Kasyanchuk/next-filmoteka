import { cache } from 'react';

import { DataShema, PersonDetailsShema, PersonShema } from '@/shemas';

import { fetchApi } from './api';

export const getPersons = (page: number) => {
    return fetchApi<DataShema<PersonShema>>(`person/popular?page=${ page }`);
};

export const getPersonById = cache((id: string) => {
    return fetchApi<PersonDetailsShema>(
        `person/${ id }?append_to_response=combined_credits,images,external_ids`
    );
});