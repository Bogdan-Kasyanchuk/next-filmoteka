import clsx from 'clsx';

type Props<T> = {
    filters: Array<{
        label: string,
        value: T
    }>
    active: T,
    onClick: (value: T) => void
}

export default function Tabs<T>(props: Props<T>) {
    return (
        <ul className="c-tabs">
            {
                props.filters.map(
                    (filter, index) => (
                        <li
                            key={index}
                            className={
                                clsx('c-tabs__item', {
                                    'c-tabs__item--is-active': filter.value === props.active,
                                })
                            }
                            onClick={
                                () => {
                                    props.onClick(filter.value);
                                }
                            }
                        >
                            {filter.label}
                        </li>
                    ))
            }
        </ul>
    );
}
