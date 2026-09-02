## Why

Сторінка сезону (`/tv-shows/[id]/seasons/[season]`) показує список епізодів, але епізод — це глухий кут: користувач бачить лише картку з коротким описом у поповері й не може перейти до деталей. TMDB віддає для епізоду повноцінний набір даних (гостьові зірки, знімальна команда, відео, кадри), який зараз ніде не використовується. Сторінки фільму та тв-шоу вже задають усталений шаблон detail-сторінки — епізод має його наслідувати, щоб ієрархія «серіал → сезон → епізод» була завершеною.

## What Changes

- Новий маршрут `/[locale]/tv-shows/[id]/seasons/[season]/episodes/[episode]` зі структурою, ідентичною сторінці сезону: `page.tsx` (SSR-prefetch + `HydrationBoundary`), `components/`, `styles/`.
- Сторінка самодостатня: вона працює однаково при вході прямим лінком, із закладки чи після перезавантаження, бо сама завантажує все потрібне — деталі епізоду, назву серіала, назву сезону й список епізодів сезону для навігації. Кеш зі сторінки сезону лише прискорює перехід, але не є умовою роботи.
- Секція деталей епізоду за візуальним патерном сторінки фільму (`MovieDetails`): фон на весь блок із кадру епізоду, круглі індикатори рейтингу/голосів/тривалості, рік випуску поруч із назвою, список ключ:значення (дата виходу, номер епізоду, тип), опис унизу на всю ширину.
- Хлібна крихта «серіал / сезон {N}» (окремі посилання через `/`) + навігація «попередній / наступний епізод» у межах сезону, розміщена під кадром; на мобільних (до 768px) круглі індикатори стоять праворуч від кадру й кнопок навігації одним стовпчиком — так само, як у `MovieDetails`.
- Секція гостьових зірок (`guest_stars`) і знімальної команди епізоду (`crew`) через наявний компонент `Persons` з `CastCard` / `CrewCard`.
- Секція відео — через наявний спільний компонент `components/app/Videos` з окремим запитом до епізодного ендпоінта відео, під `Suspense` з наявним `VideosSkeleton`, як на сторінках фільму й тв-шоу.
- У наявний enum `MediaType` додається значення `EPISODE`; `getVideos` і `generalQueryKeys.videos` розширюються під епізодний шлях `tv/{id}/season/{season}/episode/{episode}/videos`.
- Галерея кадрів епізоду (`images.stills`) у стилі `Gallery` зі сторінки персони, через наявний `ImageCard`.
- Повна SEO-обвʼязка: `generateMetadata` + `generateMetaTags` з title, description, keywords, canonical і hreflang — за зразком сторінки сезону.
- Картка епізоду (`components/ui/cards/EpisodeCard.tsx`) стає клікабельною і веде на сторінку епізоду; поточний вигляд і поповер з описом зберігаються.
- Деталі епізоду беруться одним запитом `GET /tv/{series_id}/season/{season_number}/episode/{episode_number}?append_to_response=images` (гостьові зірки та знімальна команда епізоду вже є в базовій відповіді) через наявний `fetchApi`; 404 від TMDB уже мапиться на `notFound()`.

## Capabilities

### New Capabilities
- `tv-episode-page`: сторінка деталей окремого епізоду серіалу — маршрут, склад секцій, самодостатнє завантаження даних, навігація між епізодами, метадані, стани завантаження та помилок.

### Modified Capabilities
<!-- Наявних специфікацій у openspec/specs/ ще немає; правки EpisodeCard і спільного Videos — доповнення
     поведінки, яке повністю описане в новій спеці tv-episode-page. -->

## Impact

**Нові файли**
- `src/app/[locale]/tv-shows/[id]/seasons/[season]/episodes/[episode]/page.tsx`
- `src/app/[locale]/tv-shows/[id]/seasons/[season]/episodes/[episode]/components/*` (Content, CurrentEpisode, EpisodeNavigation, Gallery)
- `src/app/[locale]/tv-shows/[id]/seasons/[season]/episodes/[episode]/styles/{index,page,components}.css`

**Адитивні правки**
- `src/services/tmdb/tvShows.ts` — `getTVShowEpisodeByNumber()`
- `src/shemas.ts` — `EpisodeDetailsShema` (самостійний тип: усі поля `EpisodeShema` крім `show_id` + `images.stills`)
- `src/types.ts` — `EpisodeDetailsMapper`
- `src/helpers/transformData.ts` — `transformTVShowEpisodeDetails()`
- `src/helpers/queryKeys.ts` — `tvShowsQueryKeys.episodeById()`
- `src/routes.ts` — `pagesEpisodeUrl()`
- `src/datasets/constants.ts` — `IMG_SIZES.EPISODE_DETAILS_COVER`, `IMG_SIZES.EPISODE_IMAGE`
- `src/messages/{en,uk}.json` — нові рядки перекладу

**Правка наявного коду**
- `src/enums.ts` — нове значення `MediaType.EPISODE`
- `src/services/tmdb/general.ts` — `getVideos` вміє будувати епізодний шлях відео
- `src/helpers/queryKeys.ts` — `generalQueryKeys.videos` враховує номери сезону й епізоду
- `src/components/app/Videos/Videos.tsx` — тип пропсів приймає епізод; наявні виклики зі сторінок фільму й тв-шоу лишаються без змін
- `src/components/ui/cards/EpisodeCard.tsx` — посилання на сторінку епізоду; потребує знання `id` серіала та номера сезону, тож компонент отримує додаткові пропси, які передає сторінка сезону
- `src/components/ui/cards/ImageCard.tsx` — новий опційний проп `size` (розмір зображення), за замовчуванням поведінка не змінюється
- `src/helpers/transformData.ts` — приватний `transformEpisode` тепер перевикористовується й для деталей епізоду; параметр звужено до `Omit<EpisodeShema, 'show_id'>`
- `src/app/api/tmdb/[...path]/route.ts` — до `ALLOWED_PATH_PATTERNS` додано два патерни для епізодних шляхів (`tv/{id}/season/{s}/episode/{e}` і `.../videos`); без цього клієнтський запит відео епізоду впирався в 404 від власного проксі (знайдено й виправлено під час ручного тестування)

**Без змін**
- `components/app/Reviews`, `components/app/Recommendations` — лишаються типізованими під `MediaType.MOVIE | MediaType.TV_SHOW`.
- Фільтри trending і search перелічують значення `MediaType` явно, тож нове значення в enum на них не впливає.
- TMDB не має ендпоінтів рецензій і рекомендацій для епізода — цих секцій на сторінці не буде.
