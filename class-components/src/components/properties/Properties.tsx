import React from 'react';
import ErrorBoundary from '../common/error-boundary/ErrorBoundary';
import './properties.css';
import { Product } from '../../types/types';
import ItemProperty from './ItemProperty';

export interface ItemDescriptionProps
  extends Pick<Product, 'brand' | 'price' | 'rating'> {}

export default class Properties extends React.Component<ItemDescriptionProps> {
  constructor(props: ItemDescriptionProps) {
    super(props);
  }
  render() {
    return (
      <ErrorBoundary>
        <div className="properties-container">
          <h5>Properties</h5>
          {Object.entries(this.props).map(
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
      </ErrorBoundary>
    );
  }
}
