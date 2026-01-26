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

const zone = 'Europe/Kyiv';

export default (date: string | number | Date, locale: string, format?: string) => {
    const parsed = dayjs(date);

    if (!parsed.isValid()) {
        return '';
    }
  
    return dayjs(date).locale(locale).tz(zone).format(format ?? 'lll');
};
