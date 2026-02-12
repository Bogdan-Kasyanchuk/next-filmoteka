import { PARAMETERS } from '@/datasets/constants';
import { Locale } from '@/types';

export default (value: number, locale: Locale, options?: Intl.NumberFormatOptions) => {
  
    return new Intl.NumberFormat(
        PARAMETERS.LOCALES[ locale as keyof typeof PARAMETERS.LOCALES ],
        options
    ).format(value);
};