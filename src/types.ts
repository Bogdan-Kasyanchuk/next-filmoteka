// import { CompanyStatusType } from './enums';

// export type Align = 'left' | 'center' | 'right';

// export type CodeCountry =
//     | 'can'
//     | 'usa'
//     | 'ita'
//     | 'ukr'
//     | 'deu'
//     | 'pol'
//     | 'fra'
//     | 'esp'
//     | 'gbr'
//     | 'che'

// export type CodeCategory =
//     | 'manufacturing'
//     | 'trade'
//     | 'services'
//     | 'education'
//     | 'finance'
//     | 'construction'
//     | 'science'
//     | 'information'

// export type CompanyShema = {
//     id: string;
//     title: string;
//     logo: string;
//     category: {
//         title: string;
//         code: string;
//     };
//     status: CompanyStatusType;
//     country: {
//         title: string;
//         code: string;
//     };
//     joinedAt: string;
//     hasPromotions: boolean;
//     sold: string,
//     income: string,
//     description?: string;
// };

// export type PromotionShema = {
//     id: string;
//     companyId: string;
//     title: string;
//     image: string;
//     discount: string;
//     description?: string;
// }

// export type CompanyMapper = {
//     id: string;
//     title: string;
//     logo: string;
//     category: {
//         title: string;
//         code: string;
//     };
//     status: CompanyStatusType;
//     country: {
//         title: string;
//         code: string;
//     };
//     joinedAt: string;
//     hasPromotions?: boolean;
//     description?: string;
// };

// export type PromotionMapper = PromotionShema

// export type StatisticsMapper = Array<{
//     label: string;
//     value: number;
// }>;

// export type SalesMapper = Array<{
//     id: string;
//     title: string;
//     logo: string;
//     sold: string;
//     income: string;
// }>;

// export type PromotionsMapper = Array<{
//     title: string;
//     discount: string;
//     company: {
//         id: string;
//         title: string;
//         logo: string;
//     }
// }>;

// export type CountriesMapper = Array<{
//     title: string;
//     code: string;
//     countCompanies: number;
// }>;
