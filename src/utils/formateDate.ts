import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import 'dayjs/locale/en';

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

export const formatDate = (date: string, format?: string) => {
    const locale = 'en';
    const zone = 'Europe/Kyiv';

    return dayjs(date).locale(locale).tz(zone).format(format ?? 'lll');
};
