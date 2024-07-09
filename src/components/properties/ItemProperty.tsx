import React from 'react';
import './properties.css';

interface ItemPropertyProps {
  name: string;
  content: string | number;
}

export default class ItemProperty extends React.Component<ItemPropertyProps> {
  render() {
    return (
      <div className="item-property">
        <div className="item-property-name">{this.props.name}</div>
        <div className="item-property-content">
          {this.props.content.toString()}
        </div>
      </div>
    );
  }
}
