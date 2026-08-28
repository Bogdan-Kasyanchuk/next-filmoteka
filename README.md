# Filmoteka

Каталог фільмів, серіалів та персон на базі [TMDB API](https://www.themoviedb.org/documentation/api). Побудовано на Next.js 16 (App Router) з React 19 та повною підтримкою двох мов (`en`, `uk`).

## Стек

- **Next.js 16** (App Router, Server Components)
- **React 19** з увімкненим React Compiler
- **TypeScript** (`strict: true`)
- **next-intl** — інтернаціоналізація (`en`/`uk`)
- **TanStack Query** — кешування та стан запитів на клієнті
- **Tailwind CSS 4** + власні CSS-модулі за фічами
- **TMDB API** як джерело даних (через власний серверний проксі)

## Можливості

- Список і фільтрація фільмів, серіалів та персон із пагінацією
- Детальні сторінки фільму/серіалу/персони, сезони серіалів, схожі тайтли, рекомендації
- Пошук за фільмами, серіалами та персонами
- Розділ Trending (день/тиждень)
- Локалізація інтерфейсу (українська/англійська)
- Серверний проксі до TMDB API (`src/app/api/tmdb/[...path]`) з allow-list дозволених шляхів і rate limiting — ключ API ніколи не потрапляє на клієнт

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

| Команда                 | Опис                                    |
| ------------------------ | ---------------------------------------- |
| `yarn dev`                | Запуск дев-сервера                       |
| `yarn build`               | Продакшн-збірка                          |
| `yarn start`               | Запуск продакшн-збірки                   |
| `yarn lint`                | Лінт JS/TS (`next lint`)                 |
| `yarn typecheck`           | Перевірка типів (`tsc --noEmit`)         |
| `yarn stylelint`           | Лінт CSS                                 |
| `yarn stylelint:fix`       | Лінт CSS з автовиправленням              |

## Структура проєкту

```
src/
├── app/                # Роути App Router, включно з [locale]-групою та api/tmdb-проксі
├── components/
│   ├── app/             # Фічеві компоненти (Header, Footer, Videos, Reviews, ...)
│   └── ui/               # Перевикористовувані UI-примітиви (картки, форми, типографіка)
├── services/
│   ├── tmdb/             # Клієнт TMDB API
│   └── i18n/             # Налаштування next-intl (routing, navigation, request)
├── helpers/             # Допоміжні функції (query keys, URL, трансформація даних)
├── hooks/               # Кастомні React-хуки
├── messages/            # Переклади (en.json, uk.json)
└── styles/              # Глобальні стилі та Tailwind-конфігурація
```

## Деплой

Проєкт задеплоєний на [Netlify](https://www.netlify.com/). Врахуйте, що API-роути виконуються як окремі serverless-інстанси — вбудований in-memory rate limiting у `src/app/api/tmdb/[...path]/route.ts` діє в межах одного інстансу, а не глобально.
