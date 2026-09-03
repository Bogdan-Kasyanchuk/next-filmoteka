## 1. Schemas and services

- [x] 1.1 In `src/shemas.ts`, add `videos: { results: VideoShema[] }` to `MovieDetailsShema` and `TVShowDetailsShema`, following the inline shape already used for `credits`; verify `yarn typecheck` reports the new field on both types.
- [x] 1.2 In `src/shemas.ts`, add `'videos'` to the `Omit` lists of `CurrentMovieShema` and `CurrentTVShowShema` so the non-appending endpoints are not typed as returning it; verify `yarn typecheck` passes.
- [x] 1.3 In `src/services/tmdb/movies.ts` and `src/services/tmdb/tvShows.ts`, change `append_to_response=credits,external_ids` to `append_to_response=credits,external_ids,videos`; verify by loading a movie and a TV show detail page in `yarn dev` and confirming the details response carries a `videos.results` array.

## 2. Transform layer

- [x] 2.1 In `src/helpers/transformData.ts`, add a private `transformVideos(videos: VideoShema[]): VideoMapper[]` (unexported, like `transformCast`/`transformCrew`) that keeps only `site === VideoSiteType.YOUTUBE` entries whose `type` is `VideoType.TRAILER` or `VideoType.CLIP`, then maps each through `transformVideo`; call it from `transformMovieDetails` and `transformTVShowDetails` to populate a new `videos: VideoMapper[]` field on `MovieDetailsMapper`/`TVShowDetailsMapper`, mirroring `cast`/`crew`; verify `yarn typecheck` passes with no `as` cast in the new helper.
- [x] 2.2 Confirm the helper preserves source order and returns `[]` for an empty or fully filtered-out input; verify against a title with mixed video types on the running dev server (order and count match the retained YouTube trailers/clips).

## 3. Videos component

- [x] 3.1 Rewrite `src/components/app/Videos/Videos.tsx` to accept `{ videos: VideoMapper[] }`, return `null` when the list is empty, and otherwise render `Wrapper` with one `VideoCard` per item; remove the `useSuspenseQuery`, `useLocale`, `getVideos`, `generalQueryKeys`, and `transformVideo` usage.
- [x] 3.2 Drop the `'use client'` directive from `Videos.tsx` now that it holds no hooks, leaving `Wrapper.tsx` as the client boundary; verify the movie detail page still renders the videos block in `yarn dev` with no client-component error.
- [x] 3.3 Delete `src/components/app/Videos/Skeleton.tsx` and its `VideosSkeleton` export from `src/components/app/Videos/index.ts`; verify `yarn typecheck` reports no remaining reference.

## 4. Detail pages

- [x] 4.1 In `src/app/[locale]/movies/[id]/components/Content.tsx`, render `<Videos videos={ data.videos } />` inside the existing conditional `Container` alongside the `Persons` cast/crew blocks, extending that container's visibility condition to include `data.videos.length > 0`; remove the standalone `<Videos type={...} id={...} />` call, its `Suspense`/`VideosSkeleton` wrapper, and the `transformVideos` import from `src/app/[locale]/movies/[id]/page.tsx`; verify the page renders the same videos block with no skeleton flash.
- [x] 4.2 Apply the same change to `src/app/[locale]/tv-shows/[id]/components/Content.tsx` (alongside seasons/cast/crew) and `src/app/[locale]/tv-shows/[id]/page.tsx`; verify a TV show detail page renders its videos block identically.
- [x] 4.3 With the browser network tab open on both detail pages, confirm no request to `/api/tmdb/movie/{id}/videos` or `/api/tmdb/tv/{id}/videos` is made.

## 5. Cleanup and verification

- [x] 5.1 Remove `getVideos` from `src/services/tmdb/general.ts` (and its `VideosShema` import), `VideosShema` from `src/shemas.ts`, and `videos` from `generalQueryKeys` in `src/helpers/queryKeys.ts`; verify `grep -rn "getVideos\|VideosShema\|generalQueryKeys.videos\|VideosSkeleton" src/` returns nothing.
- [x] 5.2 Run `yarn typecheck` and `yarn lint` and confirm both pass clean.
- [x] 5.3 Spot-check the specs' behavioral cases on the dev server: a title with trailers and clips renders the block; a title with no YouTube trailers or clips renders no block and leaves recommendations/reviews in their existing order; switching locale re-renders both details and videos in the new language.
