import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

type Order = 1 | 2 | 3 | 4 | 5 | 6;
type Variant = Order;

type Props = ComponentPropsWithoutRef<`h${Order}`> & {
    order?: `h${Order}`,
    variant?: Variant,
    uppercase?: boolean,
    center?: boolean,
    bold?: boolean
};

export default function Title(props: Props) {
    const Component = props.order || 'h1';

    return (
        <Component
            id={props.id}
            className={
                clsx([
                    'c-title',
                    `c-title--${props.variant || 1}`,
                    {
                        'c-title--uppercase': props.uppercase,
                        'c-title--bold': props.bold,
                        'c-title--center': props.center
                    },
                    props.className
                ])
            }
        >
            {props.children}
        </Component>
    );
}
