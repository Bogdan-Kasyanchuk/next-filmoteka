import { PARAMETERS } from '../helpers/parameters';

export default (value: number, options?: Intl.NumberFormatOptions) =>
    new Intl.NumberFormat(PARAMETERS.LOCALE, options).format(value);