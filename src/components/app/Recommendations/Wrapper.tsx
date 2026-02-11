import { PropsWithChildren } from 'react';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';

export default function Wrapper(props: PropsWithChildren) {
    return (
        <Container className="xxl:max-w-[1440px]">
            <div className="с-recommendations">
                <Title
                    order="h3"
                    variant={ 3 }
                    className="с-recommendations__title"
                >
                    Recommendations
                </Title>

                { props.children }
            </div>
        </Container>
    );
}