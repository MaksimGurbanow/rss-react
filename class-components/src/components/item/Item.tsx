import React from 'react';
import ErrorBoundary from '../common/error-boundary/ErrorBoundary';
import './item.css';
import capitalize from '../../utils/capitalize';
import { Product } from '../../types/types';
import Properties from '../properties/Properties';
import Description from '../description/Description';

export interface ItemProps extends Product {}

export default class Item extends React.Component<ItemProps> {
  constructor(props: ItemProps) {
    super(props);
  }
  render() {
    return (
      <ErrorBoundary>
        <div className="item">
          <ErrorBoundary>
            <h3 className="item-name">{capitalize(this.props.title)}</h3>
          </ErrorBoundary>
          <ErrorBoundary>
            <img
              alt="Sprite"
              src={this.props.images[0]}
              style={{ width: '50%' }}
            />
          </ErrorBoundary>
          <Description>{this.props.description}</Description>
          <Properties
            price={this.props.price}
            brand={this.props.brand}
            rating={this.props.rating}
          />
        </div>
      </ErrorBoundary>
    );
  }
}
