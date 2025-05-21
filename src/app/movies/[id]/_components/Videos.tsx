import CastCard from '@/components/ui/cards/CastCard';
import { CastMapper } from '@/types';

type Props = {
    casts: CastMapper[];
}

export default function Videos(props: Props) {
    return (
        <ul className='mt-10 grid grid-cols-5 gap-5'>
            {
                props.casts.map(
                    (cast, index) => (
                        <li key={index}>
                            <CastCard cast={cast} />
                        </li>
                    )
                )
            }
        </ul>
    );
}