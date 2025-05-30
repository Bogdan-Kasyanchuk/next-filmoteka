import { useIntersection } from '@mantine/hooks';
import { useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useInView<T extends HTMLElement = any>(
    options?: ConstructorParameters<typeof IntersectionObserver>[1],
    once?: boolean
) {
    const { ref, entry } = useIntersection<T>(options);

    const frozenEntry = useRef<typeof entry>(null);

    frozenEntry.current = frozenEntry.current?.isIntersecting && once ? frozenEntry.current : entry;

    return {
        ref,
        entry: frozenEntry.current
    };
}

