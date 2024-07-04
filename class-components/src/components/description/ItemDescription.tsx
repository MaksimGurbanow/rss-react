import React from 'react';
import ErrorBoundary from '../common/error-boundary/ErrorBoundary';
import './description.css';

interface ItemDescriptionProps {
  name: string;
  content: string;
}

export default class ItemDescription extends React.Component<ItemDescriptionProps> {
  render() {
    return (
      <ErrorBoundary>
        <div className="item-description">
          <div className="item-description-name">{this.props.name}</div>
          <div className="item-description-content">{this.props.content}</div>
        </div>
      </ErrorBoundary>
    );
  }
}
