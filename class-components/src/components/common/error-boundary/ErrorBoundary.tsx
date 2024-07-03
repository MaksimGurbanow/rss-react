import React, { ErrorInfo, ReactNode } from 'react';
import { BaseProps } from '../../../types/props';

interface ErrorBoundaryProps extends BaseProps {
  fallback: () => ReactNode | string;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  State
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
  }
  public state: State = {
    hasError: false,
  };
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback() || <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
