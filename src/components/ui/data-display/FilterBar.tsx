import clsx from 'clsx';

type Props<T> = {
    filters: Array<{
        label: string,
        value: T
    }>
    active: T,
    onClick: (value: T) => void
}

export default function FilterBar<T>(props: Props<T>) {
    return (
        <ul className="c-filter-bar">
            {
                props.filters.map(
                    (filter, index) => (
                        <li
                            key={index}
                            className={
                                clsx('c-filter-bar__item', {
                                    'c-filter-bar__item--is-active': filter.value === props.active,
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
