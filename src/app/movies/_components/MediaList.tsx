import MovieCard from '@/components/ui/cards/MovieCard';
import { MovieMapper } from '@/types';

type Props = {
    items: MovieMapper[]
}

export default function MediaList(props: Props) {
    return (
        <ul className='p-movies__media-list'>
            {
                props.items.map(
                    (item) => (
                        <li key={item.id}>
                            <MovieCard movie={item} />
                        </li>
                    )
                )
            }
        </ul>
    );
}