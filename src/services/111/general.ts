// import { MediaType, TimeType } from '@/enums';
// import {
//     DataShema,
//     MovieShema,
//     NetworkDetailsShema,
//     PersonShema,
//     ProductionCompanyDetailsShema,
//     TVShowShema
// } from '@/shemas';
// import { Adult } from '@/types';

// export function getTrendings(type: 'all' | MediaType, time: TimeType, page: number) {
//     return fetchApi<DataShema<MovieShema | TVShowShema | PersonShema>>(
//         `trending/${ type }/${ time }?page=${ page }`
//     );
// }

// export function getSearch(
//     type: 'multi' | MediaType,
//     adult: Adult,
//     query: string,
//     page: number
// ) {
//     return fetchApi<DataShema<MovieShema | TVShowShema | PersonShema>>(
//         `search/${ type }?query=${ query }&page=${ page }&include_adult=${ adult }`
//     );
// }

// export function getNetworkById(id: string) {
//     return fetchApi<NetworkDetailsShema>(`network/${ id }`);
// }

// export function getProductionCompanyById(id: string) {
//     return fetchApi<ProductionCompanyDetailsShema>(`company/${ id }` );
// }