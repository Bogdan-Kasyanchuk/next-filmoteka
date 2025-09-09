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
        <div className='p-person__timeline'>
            <Title
                order='h3'
                variant={3}
                className='p-person__timeline-title'
            >
                Timeline
            </Title>

            <ul className="p-person__timeline-list">
                {
                    cast.length > 0 &&
                    <li className='p-person__timeline-item'>
                        <p className='p-person__timeline-item-title'>Acting</p>

                        <ul className='p-person__timeline-item-list'>
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
                    <li className='p-person__timeline-item'>
                        <p className='p-person__timeline-item-title'>Production</p>

                        <ul className='p-person__timeline-item-list'>
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

