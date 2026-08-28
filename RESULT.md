# Ревʼю проекту next-filmoteka

Дата: 2026-08-28
Стек: Next.js 16 (App Router), React 19 (React Compiler), TypeScript, next-intl, TanStack Query, Tailwind CSS 4 + власні CSS-модулі, TMDB API.

Загальне враження: проєкт добре структурований (чіткий поділ `app/`, `components/ui` vs `components/app`, `services/tmdb`, `helpers`, `utils`), послідовний код-стайл, суворий ESLint/TS конфіг, немає `any`, немає `console.*`, немає `dangerouslySetInnerHTML`. Нижче — конкретні знахідки за пріоритетом.

## 🔴 Критично / варто виправити

### 1. ✅ Параметр `query` в пошуку не екранується → URL/param injection (виправлено)
`src/services/tmdb/general.ts:29-40` (`getSearch`) і `src/services/tmdb/movies.ts` формують шлях запиту через ручну конкатенацію рядків:

```ts
fetchApi<...>(`search/${ type }?query=${ query }&page=${ page }&include_adult=${ adult }`, locale)
```

`query` береться напряму з `searchParams.query` (`src/app/[locale]/search/[[...page]]/page.tsx:65`) — це сирий, некерований користувачем текст із URL. Якщо він містить `&`, `#` або `%`, це:
- дозволяє інʼєкцію/перезапис інших query-параметрів запиту до TMDB (наприклад `?query=x&include_adult=true` перекриє прапорець дорослого контенту);
- може обрізати частину запиту (`#`) або кинути виняток у `new URL()` при некоректному `%`-екрануванні.

**Виправлено:** `getSearch` (`src/services/tmdb/general.ts`) тепер будує query-рядок через `URLSearchParams`, яка коректно екранує `&`, `#`, `%` та інші спецсимволи в `query`. Аналогічний підхід варто застосувати і в `fetchApi` (`src/services/tmdb/api.ts`) для інших динамічних значень (наприклад `id`) у перспективі.

### 2. ✅ Проксі `/api/tmdb/[...path]` — необмежений відкритий проксі до TMDB (виправлено)
`src/app/api/tmdb/[...path]/route.ts` приймає будь-який `path` і будь-які query-параметри від клієнта і безумовно доліплює до них серверний `API_KEY`, після чого форвардить запит на `api.themoviedb.org`:

```ts
const apiPath = path.join('/');
const url = new URL(`${PARAMETERS.API_URL}/${apiPath}`);
url.searchParams.append('api_key', PARAMETERS.API_KEY);
reqUrl.searchParams.forEach((value, key) => url.searchParams.append(key, value));
```

Наслідки:
- Будь-хто може використати цей роут як безкоштовний проксі до всього TMDB API під вашим ключем (витрата квоти/rate-limit, потенційне зловживання).
- Немає allow-list дозволених шляхів/методів, немає rate limiting, немає перевірки, що `path` відповідає очікуваним ендпоінтам застосунку.
- `path` не валідується — теоретично можна підставити `..`-подібні сегменти (хоч `URL` це, скоріш за все, нормалізує, варто явно перевірити).

**Виправлено:** у `src/app/api/tmdb/[...path]/route.ts` додано `ALLOWED_PATH_PATTERNS` — allow-list regex-патернів, що відповідають реальним ендпоінтам, які використовує застосунок (`movie/...`, `tv/...`, `person/...`, `trending/...`, `search/...`, `network/{id}`, `company/{id}`). Будь-який інший шлях повертає `404`. Також додано простий in-memory rate limiting за IP (`x-forwarded-for`/`x-real-ip`): максимум 60 запитів за 60 секунд, інакше `429 Too many requests`.

**Обмеження на Netlify:** цей проєкт задеплоєний на Netlify, де кожен API-роут Next.js виконується як serverless/edge-функція. Під навантаженням Netlify підіймає кілька паралельних інстансів цієї функції одночасно, і кожен інстанс має свою окрему пам'ять — а мій лічильник (`Map` у пам'яті процесу) живе саме в межах одного інстансу. Тобто:
- реальний ліміт для одного IP — це фактично "60 запитів/хв **на кожен активний інстанс**", а не 60 запитів/хв глобально;
- при "холодному старті" нового інстансу лічильник обнуляється.

Це стримує наївний/одиночний abuse (простий скрипт, що б'є в один інстанс), але не є жорсткою гарантією при реальному розподіленому навантаженні. Свідомо залишено так для швидкого фіксу без нових залежностей — якщо зловживання проксі стане реальною проблемою, наступний крок — вбудований [Netlify Rate Limiting](https://docs.netlify.com/functions/rate-limiting/) (декларативно в `netlify.toml`, працює на рівні edge, без коду) або зовнішнє спільне сховище (наприклад Upstash Redis).

### 3. ✅ Повідомлення про помилку сервера показується користувачу як є (виправлено)
`src/app/[locale]/error.tsx:22` і `src/app/global-error.tsx:27` рендерили `props.error.message` напряму в UI. А `fetchApi` (`src/services/tmdb/api.ts:50-51`) кидає `new Error(text)`, де `text` — це сире тіло відповіді від зовнішнього TMDB API. Це:
- могло показати користувачу технічний/чужою мовою текст замість локалізованого повідомлення;
- був потенційний information leak (деталі зовнішнього API, коди помилок тощо) у продакшн-білді.

**Виправлено:** в обох файлах (`src/app/[locale]/error.tsx`, `src/app/global-error.tsx`) блок з `props.error.message` тепер рендериться лише коли `process.env.NODE_ENV === 'development'`. У продакшн-білді користувач бачить тільки загальне локалізоване повідомлення (`t('Oops, ...')` / статичний текст у `global-error.tsx`), без деталей винятку.

## 🟡 Варто розглянути

### 4. Немає жодних тестів
У проєкті відсутні `*.test.*`/`*.spec.*` файли та test-runner у `devDependencies`/`scripts`. Для логіки на кшталт `generatePagination.ts`, `transformData.ts` (433 рядки трансформацій даних TMDB), `queryKeys.ts` це особливо ризиковано — регресії в трансформації даних складно відловити вручну.

### 5. ✅ `stylelint` сконфігурований, але не підключений до `scripts` (виправлено)
Був `.stylelintrc` і повний набір `stylelint-*` пакетів у `devDependencies`, але в `package.json` не було скрипту `"stylelint"` для його запуску (був лише `lint` → `next lint`, що перевіряє тільки JS/TS). Лінт стилів фактично ніколи не запускався (і, ймовірно, не в CI).

**Виправлено:** додано `"stylelint": "stylelint \"src/**/*.css\""` та `"stylelint:fix": "stylelint \"src/**/*.css\" --fix"` у `package.json`. Перевірено — на поточному коді проходить без warnings.

### 6. ✅ Немає окремого `typecheck`-скрипту (виправлено)
`tsc --noEmit` не був винесений в окремий `package.json` скрипт — легко забути прогнати перевірку типів локально/в CI окремо від `next build`.

**Виправлено:** додано `"typecheck": "tsc --noEmit"` у `package.json`. Перевірено — на поточному коді проходить без помилок.

### 7. Дублювання/неявний зв'язок `enums.ts` ↔ `MediaType.MOVIE`/`type` рядки
У `services/tmdb/*.ts` шляхи будуються конкатенацією енамів у рядки (`` `${MediaType.MOVIE}/${id}/similar` ``) — працює, але крихко: будь-яка зміна значення енама ламає URL мовчки (без помилки компіляції). Розгляньте невеликий helper для побудови шляхів TMDB, аналогічний вже наявному `buildUrl.ts`/`withBaseUrl.ts`.

### 8. Файли `src/utils/isInvalidPage.ts`, `normalizePage.ts`, `normalizeId.ts` без завершального переносу рядка
Не критично, але `wc -l` показує 0 рядків через відсутній trailing newline — ознака, що варто прогнати форматер/EOF-fixer по репозиторію.

### 9. Немає `sitemap.xml`
Є `public/robots.txt`, але немає генерації sitemap (Next.js підтримує `app/sitemap.ts`). Для контентного сайту з великою кількістю сторінок (фільми/серіали/персони) це помітно для SEO.

### 10. Незакомічені зміни в git
`git status` показує модифікований `yarn.lock` і новий нетрекований `.yarnrc.yml` (з `npmMinimalAgeGate: 0`, що вимикає захист від щойно опублікованих/потенційно шкідливих пакетів). Переконайтесь, що це усвідомлений вибір перед комітом — `npmMinimalAgeGate: 0` варто явно обґрунтувати або підняти значення.

## 🟢 Позитивні моменти

- Чиста файлова структура за фічами (`app/[locale]/.../components`, `styles` поруч зі сторінкою).
- Строгий TypeScript (`strict: true`), відсутність `any`, `@ts-ignore`, `console.*` — дисципліна коду висока.
- Розділення server/client fetch-логіки в `fetchApi` (клієнт не отримує API-ключ TMDB напряму) — гарний патерн приховування секрету.
- next-intl підключено акуратно, з `precompile` повідомлень і окремим `request.ts`/`routing.ts`.
- Використання `cache()` з `react` для дедуплікації запитів (`getMovieById`, `getCurrentMovieById`).
- ESLint-конфіг з `import/order`, `import/no-useless-path-segments` — підтримує єдиний стиль імпортів по всьому репо.

## Підсумок пріоритетів
1. ✅ Прибрати URL/param injection у пошуку (`getSearch`) — виправлено.
2. ✅ Обмежити відкритий TMDB-проксі allow-list'ом шляхів + rate limiting — виправлено.
3. ✅ Не показувати сирий `error.message` користувачу в проді — виправлено.
4. ✅ Додати `typecheck`/`stylelint` скрипти в `package.json` — виправлено. Хоча б базове тестове покриття для чистих утиліт (`transformData`, `generatePagination`) — залишається відкритим (див. п. 4 вище).
