export default (value: number, locale: string, options?: Intl.NumberFormatOptions) =>
    new Intl.NumberFormat(locale, options).format(value);