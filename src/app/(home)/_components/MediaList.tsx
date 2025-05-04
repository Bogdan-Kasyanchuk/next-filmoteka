import MovieCard from '@/components/ui/cards/MovieCard';
import TVCard from '@/components/ui/cards/TVCard';
import { MediaType } from '@/enums';
import { MovieMapper, TVMapper } from '@/types';

type Props = {
    items: Array<MovieMapper | TVMapper>
}

export default function MediaList(props: Props) {
    return (
        <ul className='p-home__media-list'>
            {
                props.items.map(
                    (item) => (
                        <li key={item.id}>
                            {
                                item.media_type === MediaType.MOVIE
                                    ? <MovieCard movie={item} />
                                    : <TVCard tv={item} />
                            }
                        </li>
                    )
                )
            }
        </ul>
    );
}