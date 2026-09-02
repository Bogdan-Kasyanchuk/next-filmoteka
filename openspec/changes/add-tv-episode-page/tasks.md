## 1. Дані та типи

- [x] 1.1 Додати `EpisodeDetailsShema` у `src/shemas.ts` як `EpisodeShema & { images: { stills: ImageShema[] } }`; перевірка — `yarn typecheck` проходить, тип експортується
- [x] 1.2 Додати `EpisodeDetailsMapper` у `src/types.ts` з полями `episode`, `guest_stars`, `crew`, `images` (за формою `SeasonDetailsMapper` / `PersonDetailsMapper`); перевірка — `yarn typecheck`
- [x] 1.3 Додати `getTVShowEpisodeByNumber(seriesId, season, episode, locale)` у `src/services/tmdb/tvShows.ts` — `fetchApi<EpisodeDetailsShema>` на `tv/{seriesId}/season/{season}/episode/{episode}?append_to_response=images`, обгорнути в `cache()`; перевірка — виклик у dev повертає обʼєкт із `crew`, `guest_stars`, `images.stills`
- [x] 1.4 Додати `transformTVShowEpisodeDetails()` у `src/helpers/transformData.ts` на наявних `transformCast` / `transformCrew` / `transformImage`, з `new Date()` для `air_date` за зразком `transformTVShowSeasonDetails`; перевірка — `yarn typecheck`
- [x] 1.5 Додати `tvShowsQueryKeys.episodeById(id, season, episode, locale)` у `src/helpers/queryKeys.ts` як `[ 'tv-shows', id, season, episode, locale ]`; перевірка — ключ не збігається з `seasonById` для тих самих аргументів
- [x] 1.6 Додати `pagesEpisodeUrl(tvShowId, season, episode)` у `src/routes.ts` поруч із `pagesSeasonUrl`; перевірка — повертає `/tv-shows/{id}/seasons/{season}/episodes/{episode}`
- [x] 1.7 Додати `IMG_SIZES.EPISODE_DETAILS_COVER = 'w780'` і `IMG_SIZES.EPISODE_IMAGE = 'w300'` у `src/datasets/constants.ts`; перевірка — зображення на сторінці вантажаться з цими розмірами в Network

## 2. Відео епізоду через спільний компонент

- [x] 2.1 Додати `EPISODE = 'episode'` у enum `MediaType` (`src/enums.ts`); перевірка — `yarn typecheck` проходить по всьому проєкту без нових помилок
- [x] 2.2 Розширити `getVideos` у `src/services/tmdb/general.ts` необовʼязковими координатами епізоду: для `MediaType.EPISODE` шлях `tv/{id}/season/{season}/episode/{number}/videos`, для решти типів поведінка без змін; перевірка — запит епізоду з відомими роликами повертає непорожній `results`
- [x] 2.3 Розширити `generalQueryKeys.videos` номерами сезону й епізоду; перевірка — ключі відео двох різних епізодів одного серіала не збігаються
- [x] 2.4 Зробити пропси `components/app/Videos/Videos.tsx` union-типом: гілка `MOVIE | TV_SHOW` з `id`, гілка `EPISODE` з обовʼязковими координатами; перевірка — наявні виклики на сторінках фільму й тв-шоу компілюються без правок, сторінки працюють як раніше
- [x] 2.5 Перевірити, що розширення `MediaType` не зачепило фільтри trending і search та типи `media_type` у `shemas.ts` / `types.ts`; перевірка — у фільтрах немає нової вкладки, `yarn typecheck` чистий

## 3. Маршрут і завантаження даних

- [x] 3.1 Створити `src/app/[locale]/tv-shows/[id]/seasons/[season]/episodes/[episode]/page.tsx` за зразком сторінки сезону: парсинг `season` і `episode` у число з `notFound()` на нецілих значеннях, `prefetchQuery` для `currentTvShowById`, `seasonById` і `episodeById`, `getQueryData` → `notFound()`, `HydrationBoundary` навколо `Content`; перевірка — відкриття існуючого епізоду віддає сторінку, `/episodes/abc` і неіснуючий номер віддають 404
- [x] 3.2 Створити `styles/{index,page,components}.css` у папці сторінки з префіксом `p-episode`, підключити `index.css` у `page.tsx` за зразком сезону; перевірка — `yarn stylelint` проходить
- [x] 3.3 Створити клієнтський `components/Content.tsx` з `useQueries` по трьох ключах + `transform*`, `Loader` під час завантаження і `throw new Error` на помилці — за зразком `Content.tsx` сторінки сезону; перевірка — сторінка рендериться з даними, у Network немає повторного запиту після гідратації
- [x] 3.4 Додати `generateMetadata` з `generateMetaTags`: title з назвою серіала, номером сезону й назвою епізоду, description, keywords, `path: pagesEpisodeUrl(...)`; перевірка — у HTML присутні `<title>`, `<meta name="description">`, canonical і `hreflang` для `en` і `uk`

## 4. Секції сторінки

- [x] 4.1 Створити `components/CurrentEpisode.tsx`: кадр (`still_path` або заглушка `/img/poster-not-available.jpg`), назва, номери сезону й епізоду, дата виходу, тривалість, тип, рейтинг у відсотках, кількість голосів, опис; порожні необовʼязкові поля не рендеряться; перевірка — епізод без `still_path`, без `overview` і без `air_date` показується без порожніх блоків
- [x] 4.2 Додати в `CurrentEpisode.tsx` посилання на серіал (`pagesTVShowUrl`) і на сезон (`pagesSeasonUrl`) за зразком `CurrentSeason.tsx`; перевірка — обидва посилання ведуть на потрібні сторінки
- [x] 4.3 Створити `components/EpisodeNavigation.tsx`: сусідні епізоди визначаються зі списку `episodes` сезону, а не арифметикою `±1`; на першому епізоді немає переходу назад, на останньому — вперед; перевірка — пройти сезон від першого до останнього епізоду і назад
- [x] 4.4 Вивести гостьових зірок через наявний `Persons` + `CastCard` і знімальну команду через `Persons` + `CrewCard`; секція не рендериться на порожньому списку; перевірка — епізод без гостьових зірок не показує секцію, картки ведуть на сторінки персон
- [x] 4.5 Підключити спільний `components/app/Videos` з `type={ MediaType.EPISODE }` під `<Suspense fallback={ <VideosSkeleton /> }>` у `page.tsx`, як на сторінках фільму й тв-шоу; перевірка — епізод з роликами показує секцію після скелетона, епізод без них — ні, решта сторінки доступна під час завантаження відео
- [x] 4.6 Створити `components/Gallery.tsx` на наявному `ImageCard` за зразком галереї сторінки персони, порожній список нічого не рендерить; перевірка — епізод із кадрами показує галерею, без кадрів — ні

## 5. Перехід зі сторінки сезону

- [x] 5.1 Додати в `src/components/ui/cards/EpisodeCard.tsx` обовʼязкові пропси `tvShowId` і `season` та `Link` на `pagesEpisodeUrl(...)` як розтягнутий оверлей (stretched link), не обгортаючи наявний вміст картки; перевірка — клік будь-де по картці відкриває сторінку епізоду
- [x] 5.2 Підняти тригер поповера над оверлеєм (`position: relative` + `z-index`) у CSS картки; перевірка — клік по кнопці опису відкриває поповер і не переходить на сторінку епізоду
- [x] 5.3 Передати `tvShowId` і `season` з `Content.tsx` сторінки сезону в `EpisodeCard`; перевірка — `yarn typecheck` проходить, сторінка сезону працює як раніше
- [x] 5.4 Перевірити клавіатурну доступність: посилання картки отримує фокус по Tab і активується Enter; перевірка — обхід списку епізодів з клавіатури

## 6. Локалізація та фінальна перевірка

- [x] 6.1 Прогнати витяг повідомлень (`yarn dev` або `yarn build`) і заповнити нові ключі в `src/messages/uk.json`; перевірка — жоден новий ключ не лишився з порожнім значенням
- [x] 6.2 Перевірити сторінку в обох локалях: підписи, формат дати й чисел, перемикач локалі лишає користувача на тому самому епізоді
- [x] 6.3 Перевірити самодостатність сторінки: відкрити URL епізоду в новій вкладці без попереднього візиту на сезон і перезавантажити її; перевірка — назва серіала, назва сезону, навігація сусідніми епізодами й усі секції на місці
- [x] 6.4 Прогнати `yarn typecheck`, `yarn lint`, `yarn stylelint`, `yarn build`; перевірка — усі чотири команди завершуються без помилок
- [x] 6.5 Пройти сценарії спеки в браузері: існуючий епізод, неіснуючий епізод (404), нечисловий сегмент (404), епізод без гостьових зірок / відео / кадрів, перший і останній епізоди сезону, а також сторінки фільму й тв-шоу після правки спільного `Videos`

## 7. Виправлення й візуальне вирівнювання з `MovieDetails` (за результатами рев'ю)

- [x] 7.1 Виправити клієнтський проксі `src/app/api/tmdb/[...path]/route.ts`: додати патерни для `tv/{id}/season/{s}/episode/{e}` і `.../episode/{e}/videos` до `ALLOWED_PATH_PATTERNS`; перевірка — клієнтський запит відео епізоду (після гідратації) повертає 200, а не 404
- [x] 7.2 Узгодити `EpisodeDetailsShema`/`EpisodeDetailsMapper` після ручної правки типів: `transformEpisode` звужено до `Omit<EpisodeShema, 'show_id'>`; перевірка — `yarn typecheck` чистий
- [x] 7.3 Перебудувати `CurrentEpisode.tsx` за візуальним патерном `MovieDetails`: фон на весь блок, круглі індикатори рейтингу/голосів/тривалості, рік поруч із назвою, хлібна крихта «серіал / сезон» окремими посиланнями через `/`, список деталей у форматі ключ:значення; перевірка — вручну звірити з `MovieDetails` у браузері (EN і UK)
- [x] 7.4 Прибрати стрілки з кнопок навігації (`EpisodeNavigation.tsx`), лишити тільки текст; перевірка — кнопки не містять `<Icon>`
- [x] 7.5 Стилізувати кнопки навігації кольором/фоном/бордером/ховером `.p-movie__details-similar-button`; перевірка — вручну звірити ховер і disabled-стан у браузері
- [x] 7.6 Додати `ImageCard`'у опційний проп `size`, використати `IMG_SIZES.EPISODE_IMAGE` у `Gallery.tsx` епізода; перевірка — `yarn typecheck`, галерея персони не змінилась
- [x] 7.7 Розмістити круглі індикатори праворуч від кадру й кнопок навігації одним стовпчиком на екранах до 768px (як у `MovieDetails`), обгорнувши хлібну крихту/заголовок/кола/список в `.p-episode__current-episode-info` (`display: contents` мобільно, `display: flex; flex-direction: column` від `--min-md`); перевірка — вручну звірити мобільну й десктопну розкладку в браузері
- [x] 7.8 Перевірити, що десктопна розкладка не розтягується по висоті (хлібна крихта впритул до заголовка, кнопки навігації компактні, не `stretch`); перевірка — вручну звірити в браузері на десктопній ширині
