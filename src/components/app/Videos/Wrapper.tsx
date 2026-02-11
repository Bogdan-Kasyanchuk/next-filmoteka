import { PropsWithChildren } from 'react';

import Container from '@/components/ui/layouts/Container';
import Title from '@/components/ui/typography/Title';

export default function Wrapper(props: PropsWithChildren) {
    return (
        <Container className="xxl:max-w-[1440px]">
            <div className="с-videos">
                <Title
                    order="h3"
                    variant={ 3 }
                    className="с-videos__title"
                >
                    Videos
                </Title>

                { props.children }
            </div>
        </Container>
    );
}
