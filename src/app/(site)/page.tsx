import { redirect } from '@/services/i18n/navigation';
import { routing } from '@/services/i18n/routing';

export default function RootPage() {
    redirect({
        href: '/',
        locale: routing.defaultLocale
    });
}
