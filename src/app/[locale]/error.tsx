'use client';

import ErrorComponent from '@/components/ui/data-display/Error';

type Props = {
    error: Error
};

export default function Error(props: Props) {
    return <ErrorComponent error={ props.error } />;
}
