import MovieCard from '@/components/ui/cards/MovieCard';
import Title from '@/components/ui/typography/Title';
import { RecommendationMovieMapper } from '@/types';

type Props = {
    recommendations: RecommendationMovieMapper[];
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
                                <MovieCard movie={recommendation} />
                            </li>
                        )
                    )
                }
            </ul>
        </div>
    );
}