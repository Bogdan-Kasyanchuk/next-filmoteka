
import { Metadata } from 'next';

import Content from './_components/Content';

import './_styles/index.css';

type Props = {
    params: Promise<{
        id: string
        season: string
    }>
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    const { id, season } = await props.params;

    return {
        title: `${id}: ${season}`
    };
}

export default async function Page(props: Props) {
    const { season } = await props.params;

    return (
        <div className='p-season'>
            Tv-show season {season}
            <Content />
        </div>
    );
}