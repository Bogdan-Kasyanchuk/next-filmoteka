import clsx from 'clsx';
import { ComponentPropsWithoutRef, ReactNode, useId } from 'react';

type Props = Omit<ComponentPropsWithoutRef<'input'>, 'className'> & {
    startSection?: ReactNode,
    endSection?: ReactNode,
    label?: string,
    error?: string,
    classNames?: {
        group?: string,
        wrapper?: string,
        label?: string,
        field?: string,
        section?: string,
        error?: string
    }
};

export default function Input(props: Props) {
    const defaultID = useId();

    const {
        id = defaultID,
        startSection,
        endSection,
        label,
        error,
        classNames,
        disabled,
        ...rest
    } = props;

    return (
        <div
            className={
                clsx([
                    'f-group',
                    classNames?.group,
                    {
                        'f-group--disabled': disabled
                    }
                ])
            }
        >
            {
                label &&
                <label
                    htmlFor={ id }
                    className={ clsx('f-label', classNames?.label) }
                >
                    { label }
                </label>
            }

            <div className={ clsx('f-field__wrapper', classNames?.wrapper) }>
                {
                    startSection &&
                    <div className={ clsx('f-field__section', classNames?.section) }>
                        { startSection }
                    </div>
                }

                <input
                    id={ id }
                    className={
                        clsx([
                            'f-field',
                            classNames?.field,
                            {
                                'f-field--error': error
                            }
                        ])
                    }
                    disabled={ disabled }
                    { ...rest }
                />

                {
                    endSection &&
                    <div className={ clsx('f-field__section', classNames?.section) }>
                        { endSection }
                    </div>
                }
            </div>

            {
                error &&
                <div className={ clsx('f-error', classNames?.error) }>
                    { error }
                </div>
            }
        </div>
    );
}
