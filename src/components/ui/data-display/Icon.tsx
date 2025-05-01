import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'i'> & {
    name: string
    type: 'mono' | 'color'
};

export default function Icon(props: Props) {
    const { name, type, className, ...rest } = props;

    return (
        <i
            className={
                clsx([
                    'i-icon',
                    `i-icon--${type}`,
                    `i-icon--${name}`,
                    className
                ])
            }
            {...rest}
        />
    );
}
