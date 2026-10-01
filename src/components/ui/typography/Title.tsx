import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

type Order = 2 | 3 | 4;
type Variant = Order;

type Props = ComponentPropsWithoutRef<`h${ Order }`> & {
    order?: `h${ Order }`,
    variant?: Variant
};

export default function Title(props: Props) {
    const { order, variant, className, ...rest } = props;

    const Component = order || 'h2';

    return (
        <Component
            { ...rest }
            className={
                clsx([
                    'c-title',
                    `c-title--${ variant || 2 }`,
                    className
                ])
            }
        />
    );
}
