import { PropsWithChildren } from 'react';

import Container from '@/components/ui/layouts/Container';

import Filter from './components/Filter';
import Search from './components/Search';

import './styles/index.css';

export default function Layout(props: PropsWithChildren) {
    return (
        <Container className="p-search">
            <div className="p-search__head">
                <Search />

                <Filter />
            </div>

            { props.children }
        </Container>
    );
}
