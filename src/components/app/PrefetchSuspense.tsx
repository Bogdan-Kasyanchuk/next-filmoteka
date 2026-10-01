import { PropsWithChildren, ReactNode, Suspense } from 'react';

type Props = PropsWithChildren<{
    isPrefetched: boolean,
    fallback: ReactNode
}>;

// React outlines a large Suspense boundary even when it's already rendered: the HTML gets the fallback
// and an inline script swaps in the content, so without JS only the skeleton is visible.
// Data prefetched on the server doesn't suspend, so the boundary is kept only for a failed prefetch
export default function PrefetchSuspense(props: Props) {
    if (props.isPrefetched) {
        return props.children;
    }

    return (
        <Suspense fallback={ props.fallback }>
            { props.children }
        </Suspense>
    );
}
