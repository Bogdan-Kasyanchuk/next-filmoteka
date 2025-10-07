import { Arrow, Content, Portal, Root, Trigger } from '@radix-ui/react-popover';
import clsx from 'clsx';
import { PropsWithChildren, ReactNode } from 'react';

type Props = {
    trigger: ReactNode,
    classNames?: {
        content?: string,
        arrow?: string
    },
    isArrow?: boolean
};

export default function Popover(props: PropsWithChildren<Props>) {
    return (
        <Root>
            <Trigger asChild>
                { props.trigger }
            </Trigger>

            <Portal>
                <Content
                    className={ clsx('c-popover__content', props.classNames?.content) }
                    sideOffset={ props.isArrow ? 5 : 10 }
                    collisionPadding={ 20 }
                >
                    { props.children }

                    {
                        props.isArrow &&
                        <Arrow className={ clsx('c-popover__arrow', props.classNames?.arrow) } />
                    }
                </Content>
            </Portal>
        </Root>
    );
}
