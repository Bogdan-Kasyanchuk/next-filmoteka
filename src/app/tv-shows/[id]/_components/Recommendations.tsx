import TVShowCard from '@/components/ui/cards/TVShowCard';
import Title from '@/components/ui/typography/Title';
import { RecommendationTVShowMapper } from '@/types';

type Props = {
    recommendations: RecommendationTVShowMapper[];
}

export default function Recommendations(props: Props) {
    return (
        <div className='с-recommendations'>
            <Title
                order='h3'
                variant={3}
                className='с-recommendations__title'
            >
                Recommendations
            </Title>

            <ul className='с-recommendations__list'>
                {
                    props.recommendations.map(
                        (recommendation) => (
                            <li key={recommendation.id}>
                                <TVShowCard tvShow={recommendation} />
                            </li>
                        )
                    )
                }
            </ul>
        </div>
    );
}