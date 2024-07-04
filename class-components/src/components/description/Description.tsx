import React from 'react';
import ErrorBoundary from '../common/error-boundary/ErrorBoundary';
import './description.css';

export default class Description extends React.Component<{ children: string }> {
  render() {
    return (
      <ErrorBoundary>
        <div className="description-block">
          <h5>Description</h5>
          <div>${this.props.children}</div>
        </div>
      </ErrorBoundary>
    );
  }
}
