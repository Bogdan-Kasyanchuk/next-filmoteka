import clsx from 'clsx';

type Props<T> = {
    tabs: Array<{
        label: string,
        value: T
    }>,
    active: T,
    onClick: (value: T) => void
};

export default function Tabs<T>(props: Props<T>) {
    return (
        <ul className="c-tabs">
            {
                props.tabs.map(
                    (filter, index) => (
                        <li key={ index }>
                            <button
                                type="button"
                                aria-pressed={ filter.value === props.active }
                                className={
                                    clsx('c-tabs__item', {
                                        'c-tabs__item--is-active': filter.value === props.active
                                    })
                                }
                                onClick={
                                    () => {
                                        if (filter.value !== props.active) {
                                            props.onClick(filter.value);
                                        }
                                    }
                                }
                            >
                                { filter.label }
                            </button>
                        </li>
                    )
                )
            }
        </ul>
    );
}
