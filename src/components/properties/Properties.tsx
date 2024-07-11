import React from 'react';
import './properties.css';
import ItemProperty from './ItemProperty';
import { ItemDescriptionProps, ItemDescriptionValues } from '../../types/props';

const Properties = (props: ItemDescriptionProps) => {
  return (
    <div className="properties-container">
      <h5>Properties</h5>
      {Object.entries<ItemDescriptionValues>(props).map(
        ([name, value]) =>
          value && (
            <ItemProperty
              name={name}
              content={value}
              key={`name-${name}:value-${value}`}
            />
          ),
      )}
    </div>
  );
};

export default Properties;
