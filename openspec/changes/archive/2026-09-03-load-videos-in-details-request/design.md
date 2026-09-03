## Context

See proposal.md — Why.

Constraints that shape the approach:

- The detail pages (`src/app/[locale]/movies/[id]/page.tsx`, `src/app/[locale]/tv-shows/[id]/page.tsx`) are server components. Each prefetches its details query into a `QueryClient`, reads the raw payload back with `getQueryData` to decide `notFound()`, dehydrates it for `Content`, and then renders `Videos`, `Recommendations` and `Reviews` inside a `Container`, each behind its own `Suspense`.
- `getMovieById` / `getTVShowById` already use TMDB's `append_to_response` (`credits,external_ids`) and are wrapped in React `cache()`, so `generateMetadata` and the page body share one fetch.
- `Content` is a client component that turns the raw payload into a mapper via `useQuery({ select })` and shows a `<Loader />` while pending. Anything rendered from inside `Content` inherits that pending state.
- `Videos` is composed of `Videos.tsx` (fetch + filter + render), `Wrapper.tsx` (client, holds the `Videos` heading) and `Skeleton.tsx` (the `Suspense` fallback).
- `CurrentMovieShema` / `CurrentTVShowShema` are derived from the details schemas with `Omit`, and back the *other* endpoints (`getCurrentMovieById`, `getCurrentTVShowById`) that do not append anything.

## Goals / Non-Goals

**Goals:**

- One request per detail page for details + credits + external ids + videos.
- Keep the rendered videos block byte-for-byte equivalent to today's output for the same input.
- Leave `Videos` with no knowledge of TMDB, react-query, or media type.

**Non-Goals:**

- Changing which videos are shown, their order, or the video card itself.
- Touching `Recommendations` or `Reviews`, which legitimately paginate and stay on their own queries.
- Introducing runtime schema validation for the appended payload.

## Decisions

### Append `videos` to the two details requests

`getMovieById` and `getTVShowById` become `?append_to_response=credits,external_ids,videos`. TMDB nests the result as `videos: { results: [...] }`, matching how `credits` is already declared inline in `MovieDetailsShema` / `TVShowDetailsShema`.

*Alternative considered:* a parallel `getVideos` call on the server, prefetched into the same `QueryClient` and hydrated. It removes the client-side waterfall but keeps two HTTP requests and a second cache entry to keep in sync with the details entry; `append_to_response` costs nothing extra on TMDB's side.

Because the two `Current*Shema` types are `Omit`-derived from the details schemas, `'videos'` must be added to both `Omit` lists — otherwise those endpoints would be typed as returning a field they never send.

`VideosShema` and `getVideos` lose their last consumer and are removed with the component's own fetch.

### Filter and map videos inside `transformMovieDetails` / `transformTVShowDetails`, mirroring cast and crew

Filtering (YouTube + trailer/clip) and mapping happen through private `transformVideo` / `transformVideos` helpers in `src/helpers/transformData.ts` — not exported, at the same visibility as `transformCast` / `transformCrew`. `transformMovieDetails` and `transformTVShowDetails` call `transformVideos(movie.videos.results)` and return the result as a new `videos: VideoMapper[]` field on `MovieDetailsMapper` / `TVShowDetailsMapper`, exactly the way `cast` and `crew` are already populated on those same mappers.

This is also where the current defect gets fixed: today's `select` uses `filter` with a callback that *returns* `transformVideo(video)` — a truthy object — so the predicate keeps the item but the array still holds raw API objects, cast to `VideoMapper[]` with `as`. It works only because `VideoMapper`'s fields are a subset of `VideoShema`'s. Splitting filter from map removes the cast.

*Alternative considered:* a standalone, exported `transformVideos` called directly by the pages on the raw payload, bypassing the mappers. This was the first cut, but it treated videos differently from every other piece of detail data — cast, crew, seasons — that already flows through `transformMovieDetails` / `transformTVShowDetails`; putting videos through the mapper instead keeps one path from raw TMDB payload to view-model, matching the codebase's existing pattern.

### Render `Videos` from `Content`, alongside cast and crew

`Content` (the client component already responsible for cast and crew) also renders `<Videos videos={ data.videos } />`, inside the same conditional `Container` used for seasons/cast/crew — that container's visibility check is extended to include `data.videos.length > 0`. The pages no longer reference `Videos` at all; the `Suspense` boundary they previously wrapped it in is gone.

*Alternative considered (the change's original decision):* keeping `<Videos>` on the page, computing its list from the raw payload there. Reversed on reconsideration: it required deriving videos outside the mapper `Content` already uses for every other piece of the same payload, duplicating a raw-payload-to-view-model step the mapper already performs, and kept videos structurally separate from the sibling data (cast, crew) it sits next to in the UI.

### `Videos` stays a presentational component; it now renders inside `Content`'s client tree

`Videos.tsx` is unchanged from the previous decision: it takes only `{ videos: VideoMapper[] }` and returns `null` on an empty list. What changed is where it mounts. `Content` carries `'use client'`, so `Videos` (and its child `Wrapper`) now render as part of `Content`'s client-rendered subtree rather than the server-rendered page tree. This does not reintroduce a loading state in practice: `Content`'s query is seeded from the server's prefetched, dehydrated cache, so `isPending` is already `false` on first paint — confirmed in the browser, no skeleton flash on either detail page.

## Risks / Trade-offs

- **A malformed or missing `videos` key in the appended payload would crash the page render** → read it as `data.videos?.results ?? []`; an absent append degrades to no videos block, which is already a supported state.
- **`generateMetadata` shares the cached details fetch, so its payload grows too** → the growth is a few kilobytes of video metadata on a response that already carries full credits; no extra request, since React `cache()` dedupes.
- **Videos lose their independent cache entry and now expire with the details entry** → intended; a title's videos change no more often than its details, and the two were already fetched for the same id and locale.
- **The videos block no longer streams in separately, so it is part of the page's blocking render** → the details request had to resolve before the page rendered anyway, and `append_to_response` does not measurably slow it; the trade is a slightly larger first payload for one fewer round trip.
- **Type-only regression risk on the `Omit`-derived `Current*Shema` types** → `yarn typecheck` covers it; the schemas are compile-time only.
- **Videos are now part of `Content`'s client-rendered subtree rather than the server-rendered page tree** → no observable regression: `Content`'s data comes from the server-prefetched, hydrated cache, so it's already present on first paint; verified in the browser on both a movie and a TV show page.
