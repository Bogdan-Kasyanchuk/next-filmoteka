'use client';

import { Arrow, Content, Portal, Root, Trigger } from '@radix-ui/react-popover';
import clsx from 'clsx';
import React, { ReactNode } from 'react';

type Props = {
    trigger: ReactNode,
    content: ReactNode,
    classNames?: {
        content?: string,
        arrow?: string
    }
}

export default function EpisodeCard(props: Props) {
    return (
        <Root>
            <Trigger asChild>
                {props.trigger}
            </Trigger>

            <Portal>
                <Content
                    className={clsx('c-popover__content', props.classNames?.content)}
                    sideOffset={10}
                    collisionPadding={20}
                >
                    {props.content}

                    <Arrow className={clsx('c-popover__arrow', props.classNames?.arrow)} />
                </Content>
            </Portal>
        </Root>
    );
};
