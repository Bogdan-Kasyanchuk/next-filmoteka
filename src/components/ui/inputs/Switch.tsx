'use client';

import clsx from 'clsx';
import { useExtracted } from 'next-intl';
import { ComponentPropsWithoutRef, useId } from 'react';

import Icon from '@/components/ui/data-display/Icon';

type Props = Omit<ComponentPropsWithoutRef<'input'>, 'className'> & {
    label?: string,
    classNames?: {
        group?: string,
        switch?: string,
        inner?: string,
        label?: string,
        field?: string
    }
};

export default function Switch(props: Props) {
    const t = useExtracted();

    const defaultID = useId();

    const {
        id = defaultID,
        type = 'checkbox',
        label,
        classNames,
        checked,
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
            <div className={ clsx('f-switch', classNames?.switch) }>
                {
                    label &&
                    <div className={ clsx('f-switch__label', classNames?.label) }>
                        { label }
                    </div>
                }
                
                <input
                    id={ id }
                    type={ type }
                    className={ clsx('f-switch__field sr-only', classNames?.field) }
                    checked={ checked }
                    disabled={ disabled }
                    { ...rest }
                />

                <label
                    htmlFor={ id }
                    className={ clsx('f-switch__inner', classNames?.inner) }
                >
                    <span className="f-switch__icon">
                        <Icon name="check" />
                    </span>

                    <span className="f-switch__text">
                        { checked ? t('Yes') : t('No') }
                    </span>
                </label>
            </div>
        </div>
    );
}
