import clsx from 'clsx';
import { PropsWithChildren } from 'react';

type Props = {
    size?: 'small' | 'medium' | 'large' | 'full',
    className?: string
};

export default function Container(props: PropsWithChildren<Props>) {
    return (
        <div
            className={
                clsx([
                    'container l-container',
                    {
                        [ `l-container--${ props.size }` ]: props.size
                    },
                    props.className
                ])
            }
        >
            { props.children }
        </div>
    );
}
