# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Команди

Менеджер пакетів — Yarn (`.yarnrc.yml`).

```bash
yarn dev              # дев-сервер на :3000
yarn build            # продакшн-збірка (заодно витягує повідомлення next-intl)
yarn lint             # eslint . (legacy-конфіг .eslintrc.json, ESLint 8)
yarn typecheck        # tsc --noEmit
yarn stylelint        # лінт src/**/*.css; yarn stylelint:fix — з автовиправленням
```

Тестів у проєкті немає. Перевірка змін — `yarn lint && yarn typecheck && yarn stylelint`.

Потрібен `.env.local` (див. `.env.example`): `API_KEY` (TMDB, лише сервер) і `NEXT_PUBLIC_APP_URL`.

## Архітектура

Каталог фільмів/серіалів/персон на TMDB API. Next.js 16 App Router, React 19 з React Compiler (`reactCompiler: true`), next-intl, TanStack Query.

### Звідки беруться дані

- `src/services/tmdb/api.ts` → `fetchApi()` — єдина точка доступу до TMDB, і вона ізоморфна:
  - **на сервері** йде напряму в `api.themoviedb.org` з `api_key` і `next: { revalidate }`;
  - **на клієнті** йде в проксі `/api/tmdb/...` (`src/app/api/tmdb/[...path]/route.ts`), щоб ключ не потрапив у браузер.
- `src/services/tmdb/allowedPaths.ts` — allow-list шляхів TMDB разом із часом кешування для кожного. **Новий ендпоінт TMDB не запрацює, поки його немає тут** (`fetchApi` кине `TmdbError(404)`, проксі відповість 404). Новий query-параметр так само треба додати в `ALLOWED_QUERY_PARAMS` у route-проксі, інакше клієнт отримає 400.
- У проксі є in-memory rate limit. На Netlify кожен serverless-інстанс має свій ліміт, глобального немає.
- Типи відповідей TMDB лежать у `src/shemas.ts` (назва з одруківкою `shemas`/`*Shema` — так прийнято в усьому коді). Перетворення сирих даних на моделі для UI — `src/helpers/transformData.ts`, викликається в `select` у `useQuery`.

### Патерн сторінки (server prefetch → client hydrate)

Кожен роут у `src/app/[locale]/…` побудований однаково (еталон — `movies/[[...page]]/page.tsx` і `movies/[id]/page.tsx`):

1. `page.tsx` (серверний) викликає `setRequestLocale(locale)`, створює `QueryClient`, через `queryClient.fetchQuery` загортає основний запит у `withNotFound()` (404 від TMDB → `notFound()`) і рендерить `<HydrationBoundary state={dehydrate(queryClient)}>`.
2. `components/Content.tsx` (`'use client'`) робить `useQuery` з **тим самим** `queryKey` із `src/helpers/queryKeys.ts` і тією ж функцією сервісу, тож дані беруться з гідратованого кешу.
3. Другорядні блоки (рекомендації, відгуки) підтягуються через `prefetchInfiniteQuery`, який не кидає помилок. Їх загортають у `ErrorBoundary` + `PrefetchSuspense`: Suspense-межа лишається тільки тоді, коли префетч не вдався (коментар у `src/components/app/PrefetchSuspense.tsx` пояснює чому).

`staleTime: Infinity` у `QueryProvider` поставлено свідомо: актуальність даних забезпечує серверний кеш (ISR + fetch revalidate). Ключі запитів завжди містять `locale`.

Пагінація зроблена через опційний catch-all `[[...page]]` (`/movies`, `/movies/page/2`). Номер сторінки береться з `params.page[1]` через `normalizePage`/`isInvalidPage`. TMDB віддає не більше 500 сторінок, тому `totalPages` обрізається до 500. Фільтри передаються через `searchParams` (`?type=…`).

Детальні сторінки мають `generateStaticParams() { return [] }`: рендер на перший запит, далі кеш.

### i18n (next-intl)

- Локалі `en` (дефолтна, без префікса — `localePrefix: 'as-needed'`) і `uk`. Конфіг лежить у `src/services/i18n/`, middleware — у `src/proxy.ts` (так у Next 16 називається middleware).
- Для навігації використовуй `Link`/`redirect`/`useRouter` з `@/services/i18n/navigation`, а не з `next/*`. Для внутрішніх посилань на динамічні сторінки є `PrefetchLink`: він префетчить тільки після hover/touch/focus.
- Шляхи сторінок задаються функціями з `src/routes.ts`.
- Переклади працюють через **extracted messages**: у коді пишуть `useExtracted()` / `getExtracted({ locale })` і передають англійський текст напряму (`t('Recommendations')`). `src/messages/{en,uk}.json` з хеш-ключами генерує плагін (`next.config.ts`, `extract.sourceLocale: 'en'`). Ключі вручну не придумуй: додай рядок у код, запусти dev/build, після цього впиши український переклад у `uk.json` під згенерованим ключем.

### Зображення

`next/image` працює з кастомним лоадером `src/services/tmdb/imageLoader.ts`: URL TMDB переписуються на найближчий розмір CDN TMDB, оптимізатор Next не використовується. Базові розміри задані в `IMG_SIZES` (`src/datasets/constants.ts`).

### Стилі

- Основа — звичайний CSS з BEM і префіксами: `p-` для сторінки, `c-` для компонента, `u-` для утиліти. Tailwind 4 у JSX майже не використовується (тільки в `global-error.tsx`/`global-not-found.tsx`). Умовні класи збираються через `clsx`.
- Глобальні стилі імпортуються в `src/styles/app.css` (з `@layer`). Стилі карток і решти компонентів лежать у `src/styles/components/` і підключаються там, де потрібні.
- Кожен роут має `styles/index.css`, який імпортує `@/styles/media.css` + `components.css` (потрібні цій сторінці компонентні стилі) + `page.css` (блок `p-…`). `index.css` імпортується в `page.tsx`.
- PostCSS: `postcss-import` з резолвом `@/` → `src/`, вкладеність, `postcss-custom-media`. Брейкпоінти пишуться як `@media (--min-md)` / `(--max-sm)` (див. `src/styles/media.css`). Токени Tailwind (кольори, шкала `--text-*`) задані в `src/styles/tailwind/theme.css`.

### Код-стиль

ESLint (`@tarik02/eslint-config-type-1*`) суворо стежить за форматуванням: 4 пробіли, пробіли всередині `{ }` у JSX і `[ ]`/`${ }`, порядок імпортів (зовнішні → `@/` → відносні → css, з порожнім рядком між групами, за алфавітом), імпорти без розширень (крім css/json/зображень). Компоненти експортуються як `export default function`, пропси типізуються через `type Props` і читаються як `props.x` без деструктуризації.

### Навмисні рішення

Сайт свідомо закритий від індексації: `robots: { index: false }` у `generateMetaTags`, `Disallow` у `robots.txt`. Це не баг, і «виправляти» це не треба.
