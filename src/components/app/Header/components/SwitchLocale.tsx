'use client';

import { Locale, useLocale } from 'next-intl';

import { usePathname, useRouter } from '@/services/i18n/navigation';

export default function LocaleSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    const newLocale = locale === 'en' ? 'uk' : 'en';

    const setLocale = (locale: Locale) => {
        router.replace(pathname, { locale });
    };

    return (
        <button
            aria-label="Language switcher"
            className="c-locale-switcher"
            onClick={
                () => {
                    setLocale(newLocale);
                } 
            }
        >
            { newLocale }
        </button>
    );
}
