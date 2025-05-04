import TVCard from '@/components/ui/cards/TVCard';
import { TVMapper } from '@/types';

type Props = {
    items: TVMapper[]
}

export default function MediaList(props: Props) {
    return (
        <ul className='p-tvs__media-list'>
            {
                props.items.map(
                    (item) => (
                        <li key={item.id}>
                            <TVCard tv={item} />
                        </li>
                    )
                )
            }
        </ul>
    );
}