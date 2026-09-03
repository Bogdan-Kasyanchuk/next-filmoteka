## Why

On the movie and TV show detail pages the `Videos` block fetches its own list of videos from TMDB (`/{type}/{id}/videos`) after the page's main details request has already resolved. That is a second network round trip for data TMDB can return inside the main request via `append_to_response`, and it makes the videos block appear late, behind its own `Suspense` skeleton, on a page whose other data is already there.

## What Changes

- The movie details request (`getMovieById`) and the TV show details request (`getTVShowById`) append `videos` to `append_to_response`, so videos arrive with the main payload.
- Video filtering (YouTube trailers and clips only) and mapping move out of the `Videos` component and into `transformMovieDetails` / `transformTVShowDetails`, the same functions that already map cast and crew — `videos` becomes a field on `MovieDetailsMapper` / `TVShowDetailsMapper`, populated exactly like `cast` and `crew`. This also fixes a latent defect: the current filter returns raw API objects cast to `VideoMapper[]` instead of running them through `transformVideo`.
- `Videos` becomes a presentational component: it takes the already-prepared video list as a prop and renders it. It no longer knows about media type, id, locale, query keys, or fetching.
- `Content` — the existing client component that already renders a title's cast and crew from the mapped details — also renders `Videos`, right alongside them. The movie and TV show pages no longer reference `Videos` at all, and drop the `Suspense` boundary they previously wrapped it in.
- Removals of code left with no consumer: the `VideosSkeleton` component, the `getVideos` service function, and the `generalQueryKeys.videos` key.
- No visible change to the videos block itself — same heading, same cards, same order, and still hidden entirely when a title has no matching videos.

## Capabilities

### New Capabilities
- `media-videos`: how videos for a movie or TV show are obtained, filtered, and displayed on the detail pages.

### Modified Capabilities

<!-- None: openspec/specs/ is currently empty, so this is the first spec for this behavior. -->

## Impact

- `src/services/tmdb/movies.ts` — `getMovieById` query string.
- `src/services/tmdb/tvShows.ts` — `getTVShowById` query string.
- `src/services/tmdb/general.ts` — `getVideos` removed.
- `src/shemas.ts` — `MovieDetailsShema` and `TVShowDetailsShema` gain a `videos` field; `CurrentMovieShema` / `CurrentTVShowShema` (derived via `Omit`) must exclude it, since `getCurrentMovieById` / `getCurrentTVShowById` do not append it; the now-unused `VideosShema` is removed.
- `src/types.ts` — `MovieDetailsMapper` and `TVShowDetailsMapper` gain `videos: VideoMapper[]`, alongside their existing `cast`/`crew` fields.
- `src/helpers/transformData.ts` — private `transformVideo` / `transformVideos` helpers (not exported, matching `transformCast` / `transformCrew`), called from `transformMovieDetails` and `transformTVShowDetails`.
- `src/helpers/queryKeys.ts` — `generalQueryKeys.videos` removed.
- `src/components/app/Videos/` — `Videos.tsx` rewritten as props-driven; `Skeleton.tsx` and its `index.ts` export removed.
- `src/app/[locale]/movies/[id]/components/Content.tsx`, `src/app/[locale]/tv-shows/[id]/components/Content.tsx` — render `Videos` alongside cast/crew (and seasons, for TV shows), inside the same conditional `Container`.
- `src/app/[locale]/movies/[id]/page.tsx`, `src/app/[locale]/tv-shows/[id]/page.tsx` — no longer reference `Videos`; the videos `Suspense` boundary is gone.
- Behavioral side effect: videos now share the cache lifetime and locale of the details request rather than having their own query entry.
