import React from 'react';
import './description.css';

export default class Description extends React.Component<{ children: string }> {
  render() {
    return (
      <div className="description-block">
        <h5>Description</h5>
        <div>{this.props.children}</div>
      </div>
    );
  }
}
