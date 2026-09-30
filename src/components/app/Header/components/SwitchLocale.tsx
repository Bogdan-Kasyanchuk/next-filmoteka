'use client';

import { Locale, useExtracted, useLocale } from 'next-intl';

import { startNavigationProgress } from '@/components/app/NavigationProgress';
import { usePathname, useRouter } from '@/services/i18n/navigation';

export default function LocaleSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();

    const t = useExtracted();

    const newLocale = locale === 'en' ? 'uk' : 'en';

    const setLocale = (locale: Locale) => {
        startNavigationProgress();
        // keep filters and the search query; read at click time so static pages don't depend on search params
        router.replace(`${ pathname }${ window.location.search }`, { locale });
    };

    return (
        <button
            aria-label={ t('Language switcher') }
            className="c-locale-switcher"
            onClick={
                () => {
                    setLocale(newLocale);
                } 
            }
        >
            { locale }
        </button>
    );
}
