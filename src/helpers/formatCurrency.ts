import { PARAMETERS } from './parameters';

export const formatCurrency = (value: number, options?: Intl.NumberFormatOptions) =>
    new Intl.NumberFormat(PARAMETERS.LOCALE, options).format(value);