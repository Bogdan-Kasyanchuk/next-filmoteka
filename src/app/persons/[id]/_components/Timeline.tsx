import MediaCastCard from '@/components/ui/cards/MediaCastCard';
import MediaCrewCard from '@/components/ui/cards/MediaCrewCard';
import Title from '@/components/ui/typography/Title';
import { MediaCastMapper, MediaCrewMapper } from '@/types';

type Props = {
    cast: MediaCastMapper[];
    crew: MediaCrewMapper[];
}

function transformedData<T extends MediaCastMapper | MediaCrewMapper>(data: T[]) {
    const noDate = data.filter(item => !item.release_date);
    const withDate = data.filter(item => item.release_date).sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());

    return [...withDate, ...noDate];
};

export default function Timeline(props: Props) {

    const cast = transformedData(props.cast);
    const crew = transformedData(props.crew);

    return (
        <div className='с-timeline'>
            <Title
                order='h3'
                variant={3}
                className='с-timeline__title'
            >
                Timeline
            </Title>

            <ul className="с-timeline__list">
                {
                    cast.length > 0 &&
                    <li className='с-timeline__item'>
                        <p className='с-timeline__item-title'>Acting</p>

                        <ul className='с-timeline__item-list'>
                            {
                                cast.map(
                                    (item, index) => (
                                        <li key={index}>
                                            <MediaCastCard cast={item} />
                                        </li>
                                    )
                                )
                            }
                        </ul>
                    </li>
                }

                {
                    crew.length > 0 &&
                    <li className='с-timeline__item'>
                        <p className='с-timeline__item-title'>Production</p>

                        <ul className='с-timeline__item-list'>
                            {
                                crew.map(
                                    (item, index) => (
                                        <li key={index}>
                                            <MediaCrewCard crew={item} />
                                        </li>
                                    )
                                )
                            }
                        </ul>
                    </li>
                }
            </ul>
        </div >
    );
}

