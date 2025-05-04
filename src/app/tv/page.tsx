import { Suspense } from 'react';

import Loader from '@/components/ui/data-display/Loader';
import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';
import { TVS } from '@/mock/data';

import Filters from './_components/Filters/Filters';
import MediaList from './_components/MediaList';

import './_styles/index.css';

export default function Movie() {
    return (
        <Container className='p-tvs'>
            <Filters />

            <Title
                center
                bold
                uppercase
            >
                TVS
            </Title>

            <Suspense fallback={<Loader />}>
                <MediaList items={TVS} />
            </Suspense>
        </Container>
    );
}