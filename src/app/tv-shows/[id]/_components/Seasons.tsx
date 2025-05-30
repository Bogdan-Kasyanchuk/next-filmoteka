import SeasonCard from '@/components/ui/cards/SeasonCard';
import Title from '@/components/ui/typography/Title';
import { SeasonMapper } from '@/types';

type Props = {
    seasons: SeasonMapper[];
    tvShowId: string
}

export default function Seasons(props: Props) {
    return (
        <div className='pt-[30px] border-t border-t-primary/75 -mx-2.5 px-2.5 xxxl:-mx-5 xxxl:px-5'>
            <Title
                order='h3'
                variant={3}
                className='-mt-1.5 font-bold uppercase'
            >
                Seasons
            </Title>

            <ul className='mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                {
                    props.seasons.map(
                        (season, index) => (
                            <li key={index}>
                                <SeasonCard
                                    season={season}
                                    tvShowId={props.tvShowId}
                                />
                            </li>
                        )
                    )
                }
            </ul>
        </div >
    );
}