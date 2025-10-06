import clsx from 'clsx';

type Props = {
    className?: string,
    classNameInner?: string
};

export default function Loader(props: Props) {
    return (
        <div className={ clsx('c-loader', props.className) }>
            <div className={ clsx('c-loader__inner', props.classNameInner) }>Loading...</div>
        </div>
    );
}
