import React, { ErrorInfo, ReactNode } from 'react';
import { BaseProps } from '../../../types/props';

interface ErrorBoundaryProps extends BaseProps {
  fallback?: () => ReactNode | string;
}

interface State {
  error: {
    exists: boolean;
    message: string;
  };
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  State
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
  }
  public state: State = {
    error: {
      exists: false,
      message: '',
    },
  };
  static getDerivedStateFromError() {
    return {
      error: {
        exists: true,
      },
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: {
        exists: true,
        message: error.message,
      },
    });
    console.error(error, errorInfo);
  }

  private emitFallback() {
    if (this.props.fallback) return this.props.fallback();
    return null;
  }

  render() {
    if (this.state.error.exists) {
      return this.emitFallback() || <h1>{this.state.error.message}</h1>;
    }

    return this.props.children;
  }
}
