import clsx from 'clsx';
import { useExtracted } from 'next-intl';

type Props = {
    className?: string,
    classNameInner?: string
};

export default function Loader(props: Props) {
    const t = useExtracted();

    return (
        <div
            role="status"
            className={ clsx('c-loader', props.className) }
        >
            <div className={ clsx('c-loader__inner', props.classNameInner) }>
                { t('Loading') }
                
                <span />
            </div>
        </div>
    );
}
