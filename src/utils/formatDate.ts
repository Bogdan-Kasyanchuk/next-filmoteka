import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { Locale } from 'next-intl';
import 'dayjs/locale/en';

import { PARAMETERS } from '@/datasets/constants';

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

export default (date: string | number | Date, locale: Locale, format?: string) => {
    const parsed = dayjs(date);

    if (!parsed.isValid()) {
        return '';
    }
  
    return dayjs(date)
        .locale(locale)
        .tz(PARAMETERS.ZONE)
        .format(format ?? 'lll');
};