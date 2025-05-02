import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';

import FilterTrending from './_components/FilterTrending';
import ResourcesList from './_components/ResourcesList';

import '@/styles/pages/home.css';

export default function Home() {
    return (
        <Container className='p-home'>
            <FilterTrending />

            <Title
                center
                bold
                uppercase
            >
                Trending today
            </Title>

            <ResourcesList />
        </Container>
    );
}