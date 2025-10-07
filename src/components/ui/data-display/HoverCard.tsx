import { Content, Portal, Root, Trigger } from '@radix-ui/react-hover-card';
import clsx from 'clsx';
import { PropsWithChildren, ReactNode } from 'react';

type Props = {
    trigger: ReactNode,
    classNameContent?: string
};

export default function HoverCard(props: PropsWithChildren<Props>) {
    return (
        <Root
            openDelay={ 200 }
            closeDelay={ 200 }
        >
            <Trigger asChild>
                { props.trigger }
            </Trigger>

            <Portal>
                <Content
                    className={ clsx('c-hover-card__content', props.classNameContent) }
                    sideOffset={ 10 }
                    collisionPadding={ 20 }
                >
                    { props.children }
                </Content>
            </Portal>
        </Root>
    );
}
