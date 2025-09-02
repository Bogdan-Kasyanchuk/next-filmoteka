import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'i'> & {
    name: string
};

export default function Icon(props: Props) {
    const { name, className, ...rest } = props;

    return (
        <i
            className={
                clsx([
                    'i-icon',
                    `i-icon--${name}`,
                    className
                ])
            }
            {...rest}
        />
    );
}
