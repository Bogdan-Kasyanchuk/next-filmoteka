import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getExtracted, getLocale } from 'next-intl/server';
import { Suspense } from 'react';

import Videos, { VideosSkeleton } from '@/components/app/Videos';
import Container from '@/components/ui/layouts/Container';
import { MediaType } from '@/enums';
import { tvShowsQueryKeys } from '@/helpers/queryKeys';
import { pagesEpisodeUrl } from '@/routes';
import { getCurrentTVShowById, getTVShowEpisodeByNumber, getTVShowSeasonByNumber } from '@/services/tmdb/tvShows';
import { CurrentTVShowShema, EpisodeDetailsShema, SeasonDetailsShema } from '@/shemas';
import generateMetaTags from '@/utils/generateMetaTags';

import Content from './components/Content';

import './styles/index.css';

type Props = {
    params: Promise<{
        id: string,
        season: string,
        episode: string
    }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const [ locale, params ] = await Promise.all([
        getLocale(),
        props.params
    ]);

    const t = await getExtracted();

    const season = Number(params.season);
    const episode = Number(params.episode);

    if (!Number.isInteger(season) || !Number.isInteger(episode)) {
        notFound();
    }

    const [ tvShowData, episodeData ] = await Promise.all([
        getCurrentTVShowById(params.id, locale),
        getTVShowEpisodeByNumber(params.id, season, episode, locale)
    ]);

    const title = tvShowData.name || tvShowData.original_name;

    return generateMetaTags(
        {
            title: `${ title } | ${ t('Season') } ${ season } | ${ episodeData.name }`,
            description: t('Detailed information about the episode {episode} "{episodeName}" of season {season} of the tv show {title}. Its overview, guest stars, crew, videos.', {
                episode: episodeData.episode_number.toString(),
                episodeName: episodeData.name,
                season: season.toString(),
                title
            }),
            keywords: [
                title,
                episodeData.name,
                t('cast of {title}', { title }),
                t('season {season} of the {title}', {
                    season: season.toString(),
                    title
                }),
                t('episode {episode} of the {title}', {
                    episode: episodeData.episode_number.toString(),
                    title
                })
            ],
            path: pagesEpisodeUrl(params.id, season, episode),
            locale
        }
    );
}

export default async function Page(props: Props) {
    const [ locale, params ] = await Promise.all([
        getLocale(),
        props.params
    ]);

    const season = Number(params.season);
    const episode = Number(params.episode);

    if (!Number.isInteger(season) || !Number.isInteger(episode)) {
        notFound();
    }

    const queryClient = new QueryClient();

    await Promise.all([
        await queryClient.prefetchQuery(
            {
                queryKey: tvShowsQueryKeys.currentTvShowById(params.id, locale),
                queryFn: () => getCurrentTVShowById(params.id, locale)
            }
        ),
        await queryClient.prefetchQuery(
            {
                queryKey: tvShowsQueryKeys.seasonById(params.id, season, locale),
                queryFn: () => getTVShowSeasonByNumber(params.id, season, locale)
            }
        ),
        await queryClient.prefetchQuery(
            {
                queryKey: tvShowsQueryKeys.episodeById(params.id, season, episode, locale),
                queryFn: () => getTVShowEpisodeByNumber(params.id, season, episode, locale)
            }
        )
    ]);

    const tvShowData = queryClient.getQueryData<CurrentTVShowShema>(
        tvShowsQueryKeys.currentTvShowById(params.id, locale)
    );

    const seasonData = queryClient.getQueryData<SeasonDetailsShema>(
        tvShowsQueryKeys.seasonById(params.id, season, locale)
    );

    const episodeData = queryClient.getQueryData<EpisodeDetailsShema>(
        tvShowsQueryKeys.episodeById(params.id, season, episode, locale)
    );

    if (!tvShowData || !seasonData || !episodeData) {
        notFound();
    }

    return (
        <div className="p-episode">
            <HydrationBoundary state={ dehydrate(queryClient) }>
                <Content
                    id={ params.id }
                    season={ season }
                    episode={ episode }
                />
            </HydrationBoundary>

            <Container className="p-episode__container">
                <Suspense fallback={ <VideosSkeleton /> }>
                    <Videos
                        type={ MediaType.EPISODE }
                        id={ params.id }
                        season={ season }
                        episode={ episode }
                    />
                </Suspense>
            </Container>
        </div>
    );
}
