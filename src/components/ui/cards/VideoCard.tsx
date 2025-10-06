'use client';

import useInView from '@/hooks/useInView';
import { youtubeEmbedUrl } from '@/routes';
import { VideoMapper } from '@/types';
import { formatDate } from '@/utils/formateDate';

type Props = {
    video: VideoMapper
};

export default function VideoCard(props: Props) {
    const { ref, entry } = useInView({
        rootMargin: '100%'
    }, true);

    return (
        <div
            ref={ ref }
            className="c-video-card"
        >
            <div className="c-video-card__header">
                <p
                    className="c-video-card__header-name"
                    title={ props.video.name }
                >
                    { props.video.name }
                </p>

                <div className="c-video-card__header-info">
                    <span>
                        { formatDate(props.video.published_at, 'DD.MM.YYYY') }
                    </span>
                    <span>
                        { props.video.type }
                    </span>
                </div>
            </div>

            <div className="c-video-card__inner">
                {
                    entry?.isIntersecting &&
                    <iframe
                        src={ youtubeEmbedUrl(props.video.key) }
                        title={ props.video.name }
                        className="c-video-card__iframe"
                    />
                }
            </div>
        </div>
    );
}