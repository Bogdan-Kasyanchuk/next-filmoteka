import { useElementSize, useToggle } from '@mantine/hooks';
import clsx from 'clsx';
import { PropsWithChildren } from 'react';

type Props = {
    collapseHeight: number,
    classNameContent: string,
    className?: string
};

export default function ReadMore(props: PropsWithChildren<Props>) {
    const { ref, height } = useElementSize();

    const [value, toggle] = useToggle([false, true]);

    const isShowButtonToggle = height > props.collapseHeight;

    return (
        <div
            className={
                clsx([
                    'c-read-more',
                    {
                        'c-read-more--not-truncated': (value || !isShowButtonToggle),
                        'c-read-more--is-open': value
                    },
                    props.className
                ])
            }
        >
            <div
                className="c-read-more__collapse"
                style={
                    {
                        height: (!value && isShowButtonToggle)
                            ? props.collapseHeight
                            : height
                    }
                }
            >
                <div
                    ref={ref}
                    className={props.classNameContent}
                >
                    {props.children}
                </div>
            </div>

            {
                isShowButtonToggle &&
                <button
                    type="button"
                    className="c-read-more__button"
                    onClick={
                        () => {
                            toggle();
                        }
                    }
                >
                    {value ? 'Read less' : 'Read more...'}
                </button>
            }
        </div>
    );
}
