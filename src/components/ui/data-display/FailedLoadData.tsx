import { PropsWithChildren } from 'react';

export default function FailedLoadData(props: PropsWithChildren) {
    return (
        <div className="c-failed-load-data">
            <p className="c-failed-load-data__title">
                Failed to load data
            </p>

            {
                props.children &&
                <p className="c-failed-load-data__text">
                    { props.children }
                </p>
            }
        </div>
    );
}