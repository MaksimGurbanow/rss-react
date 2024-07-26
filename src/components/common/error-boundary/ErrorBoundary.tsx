import React, { ErrorInfo, ReactNode } from 'react';
import { BaseProps } from '../../../types/props';

interface ErrorBoundaryProps extends BaseProps {
  fallback?: () => ReactNode | string;
}

interface State {
  error: string;
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  State
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
  }
  public state: State = { error: '' };

  static getDerivedStateFromError(error: Error) {
    return { error: error.message };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error: error.message });
    console.error(error, errorInfo);
  }

  render() {
    if (this.props.fallback && this.state.error !== '')
      return (
        <div data-testid="error-boundary-fallback">{this.props.fallback()}</div>
      );
    if (this.state.error)
      return <h1 data-testid="error-boundary-message">{this.state.error}</h1>;

    return this.props.children;
  }
}
