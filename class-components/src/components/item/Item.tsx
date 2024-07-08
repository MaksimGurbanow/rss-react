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
      <div className="item">
        <h3 className="item-name">{capitalize(this.props.title)}</h3>
        <img alt="Sprite" src={this.props.images[0]} style={{ width: '50%' }} />
        <ErrorBoundary fallback={() => <div>Description is not mounted</div>}>
          <Description>{this.props.description}</Description>
        </ErrorBoundary>
        <ErrorBoundary fallback={() => <div>Properties are not mounted</div>}>
          <Properties
            price={this.props.price}
            brand={this.props.brand}
            rating={this.props.rating}
          />
        </ErrorBoundary>
      </div>
    );
  }
}
