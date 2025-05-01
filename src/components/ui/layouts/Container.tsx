import clsx from 'clsx';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode,
    size?: 'small' | 'medium' | 'large' | 'full',
    className?: string
};

export default function Container(props: Props) {
    return (
        <div
            className={
                clsx([
                    'l-container',
                    {
                        [`l-container--${props.size}`]: props.size
                    },
                    props.className
                ])
            }
        >
            {props.children}
        </div>
    );
}
