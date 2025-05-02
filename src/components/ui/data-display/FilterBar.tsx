type Props = {
    filters: Array<{
        label: string,
        value: string
    }>
    onClick: (value: string) => void
}

export default function FilterBar(props: Props) {
    return (
        <ul className="">
            {
                props.filters.map(
                    filter => (
                        <li
                            key={filter.value}
                            className=""
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
