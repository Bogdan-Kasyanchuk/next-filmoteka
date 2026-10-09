# Filmoteka

Каталог фільмів, серіалів та персон на базі [TMDB API](https://www.themoviedb.org/documentation/api). Побудовано на Next.js 16 (App Router) з React 19 та повною підтримкою двох мов (`en`, `uk`).

## Стек

- **Next.js 16** (App Router, Server Components)
- **React 19** з увімкненим React Compiler
- **TypeScript** (`strict: true`)
- **next-intl** — інтернаціоналізація (`en`/`uk`) з автоматичним витягуванням повідомлень
- **TanStack Query** — серверний префетч із гідратацією та кеш запитів на клієнті
- **CSS (BEM) + PostCSS** — вкладеність, custom media, `@/`-імпорти; **Tailwind CSS 4** для токенів теми та точкових утиліт
- **TMDB API** як джерело даних (через власний серверний проксі)

## Можливості

- Список і фільтрація фільмів, серіалів та персон із пагінацією
- Детальні сторінки фільму/серіалу/персони, сезони серіалів, схожі тайтли, рекомендації, відгуки
- Пошук за фільмами, серіалами та персонами
- Розділ Trending (день/тиждень)
- Локалізація інтерфейсу (українська/англійська)
- Серверний проксі до TMDB API (`src/app/api/tmdb/[...path]`) з allow-list шляхів і query-параметрів, кешуванням і rate limiting — ключ API ніколи не потрапляє на клієнт
- Зображення віддаються напряму з CDN TMDB через власний лоадер `next/image`, без оптимізатора Next.js

## Початок роботи

Встановіть залежності (проєкт використовує Yarn):

```bash
yarn install
```

Створіть `.env.local` на основі `.env.example` і вкажіть свій TMDB API-ключ:

```bash
API_KEY=your_tmdb_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Запустіть dev-сервер:

```bash
yarn dev
```

Відкрийте [http://localhost:3000](http://localhost:3000).

## Скрипти

| Команда              | Опис                             |
| -------------------- | -------------------------------- |
| `yarn dev`           | Запуск дев-сервера               |
| `yarn build`         | Продакшн-збірка                  |
| `yarn start`         | Запуск продакшн-збірки           |
| `yarn lint`          | Лінт JS/TS (`eslint .`)          |
| `yarn typecheck`     | Перевірка типів (`tsc --noEmit`) |
| `yarn stylelint`     | Лінт CSS                         |
| `yarn stylelint:fix` | Лінт CSS з автовиправленням      |

Тестів у проєкті немає.

## Структура проєкту

```
src/
├── app/                # Роути App Router: [locale]-група та api/tmdb-проксі
├── components/
│   ├── app/            # Фічеві компоненти (Header, Footer, Pagination, Reviews, ...)
│   └── ui/             # Перевикористовувані UI-примітиви (картки, інпути, типографіка)
├── services/
│   ├── tmdb/           # Клієнт TMDB API, allow-list шляхів, лоадер зображень
│   └── i18n/           # Налаштування next-intl (routing, navigation, request)
├── helpers/            # Query keys, зовнішні URL, трансформація даних
├── utils/              # Метатеги, нормалізація сторінок/ID, обробка 404
├── hooks/              # Кастомні React-хуки
├── providers/          # QueryProvider (TanStack Query)
├── datasets/           # Константи (URL API, розміри зображень) і плейсхолдери
├── messages/           # Переклади (en.json, uk.json)
├── styles/             # Глобальні та компонентні стилі, тема Tailwind, брейкпоінти
├── proxy.ts            # Middleware next-intl (у Next.js 16 — proxy)
├── routes.ts           # Функції-генератори шляхів сторінок
├── shemas.ts           # Типи відповідей TMDB
└── enums.ts, types.ts
```

Кожен роут у `src/app/[locale]/` складається з серверного `page.tsx` (префетч даних у `QueryClient` + `HydrationBoundary`), клієнтського `components/Content.tsx` (`useQuery` з тим самим ключем) і власних `styles/`.

## Переклади

Тексти пишуться прямо в коді англійською через `useExtracted()` / `getExtracted()`:

```tsx
const t = useExtracted();

t('Recommendations');
```

Під час `yarn dev` / `yarn build` next-intl сам додає нові рядки в `src/messages/*.json` під згенерованими ключами. Після цього лишається вписати український переклад у `uk.json`. Ключі вручну не створюються.

## Новий запит до TMDB

Шляхи й параметри TMDB обмежені allow-list'ом, тож новий ендпоінт треба зареєструвати:

1. додати шаблон шляху та час кешування в `src/services/tmdb/allowedPaths.ts`;
2. якщо запит має новий query-параметр — додати його валідатор у `ALLOWED_QUERY_PARAMS` у `src/app/api/tmdb/[...path]/route.ts`.

Без цього сервер отримає `TmdbError(404)`, а клієнт — 404/400 від проксі.

## Індексація

Сайт навмисно закритий від пошукових систем і ботів: `robots: { index: false, follow: false }` у метатегах і `Disallow: /` у `public/robots.txt`. Open Graph і Twitter-теги лишаються для прев'ю посилань.

## Деплой

Проєкт задеплоєний на [Netlify](https://www.netlify.com/). Врахуйте, що API-роути виконуються як окремі serverless-інстанси — вбудований in-memory rate limiting у `src/app/api/tmdb/[...path]/route.ts` діє в межах одного інстансу, а не глобально.
