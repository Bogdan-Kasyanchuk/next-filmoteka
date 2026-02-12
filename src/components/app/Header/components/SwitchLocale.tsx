'use client';

import { useLocale } from 'next-intl';

import { usePathname, useRouter } from '@/services/i18n/navigation';
import { Locale } from '@/types';

export default function LocaleSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    const setLocale = (newLocale: Locale) => {
        router.replace(pathname, { locale: newLocale });
    };

    return (
        <button
            aria-label="Language switcher"
            className="c-locale-switcher"
            onClick={
                () => {
                    setLocale(locale === 'en' ? 'uk' : 'en');
                } 
            }
        >
            { locale === 'en' ? '🇺🇦' : '🇬🇧' }
        </button>
    );
}
