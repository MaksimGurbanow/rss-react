import React from 'react';
import ErrorBoundary from '../common/error-boundary/ErrorBoundary';

export interface ItemProps {
  name: string;
  description?: string;
}

export default class Item extends React.Component<ItemProps> {
  constructor(props: ItemProps) {
    super(props);
  }
  render() {
    return (
      <ErrorBoundary fallback={() => null}>
        <ErrorBoundary
          fallback={() => <div>This item does not have a name</div>}
        >
          <div>{this.props.name}</div>
        </ErrorBoundary>
        <ErrorBoundary fallback={() => <div>No description provided</div>}>
          <div>{this.props.description}</div>
        </ErrorBoundary>
      </ErrorBoundary>
    );
  }
}
