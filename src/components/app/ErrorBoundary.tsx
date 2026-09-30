'use client';

import { Component, PropsWithChildren, ReactNode } from 'react';

type Props = PropsWithChildren<{
    fallback?: ReactNode
}>;

type State = {
    hasError: boolean
};

export default class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    render() {
        return this.state.hasError
            ? this.props.fallback ?? null
            : this.props.children;
    }
}
