import SeasonCard from '@/components/ui/cards/SeasonCard';
import Title from '@/components/ui/typography/Title';
import { SeasonMapper } from '@/types';

type Props = {
    seasons: SeasonMapper[],
    tvShowId: string
};

export default function Seasons(props: Props) {
    return (
        <div className="p-tv-show__seasons">
            <Title
                order="h3"
                variant={ 3 }
                className="p-tv-show__seasons-title"
            >
                Seasons
            </Title>

            <ul className="p-tv-show__seasons-list">
                {
                    props.seasons.map(
                        (season, index) => (
                            <li key={ index }>
                                <SeasonCard
                                    season={ season }
                                    tvShowId={ props.tvShowId }
                                />
                            </li>
                        )
                    )
                }
            </ul>
        </div>
    );
}