import CastCard from '@/components/ui/cards/CastCard';
import Title from '@/components/ui/typography/Title';
import { CastMapper } from '@/types';

type Props = {
    casts: CastMapper[];
}

export default function Casts(props: Props) {
    return (
        <div className='pt-[30px] border-t border-t-primary/75 -mx-2.5 px-2.5 xxxl:-mx-5 xxxl:px-5'>
            <Title
                order='h3'
                variant={3}
                className='-mt-1.5'
                bold
            >
                Casts
            </Title>

            <ul className='mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 xxl:grid-cols-9 gap-2.5 lg:gap-5  '>
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
        </div >
    );
}