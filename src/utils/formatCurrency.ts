import { PARAMETERS } from '@/datasets/constants';

const locale = `${ PARAMETERS.LOCALE.language }-${ PARAMETERS.LOCALE.region }`;

export default (value: number, options?: Intl.NumberFormatOptions) =>
    new Intl.NumberFormat(locale, options).format(value);