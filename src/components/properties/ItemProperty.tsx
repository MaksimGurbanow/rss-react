import React from 'react';
import './properties.css';
import { ItemPropertyProps } from '../../types/props';

const ItemProperty = ({ name, content }: ItemPropertyProps) => {
  return (
    <div className="item-property">
      <div className="item-property-name">{name}</div>
      <div className="item-property-content">{content.toString()}</div>
    </div>
  );
};

export default ItemProperty;
