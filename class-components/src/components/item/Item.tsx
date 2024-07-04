import React from 'react';
import ErrorBoundary from '../common/error-boundary/ErrorBoundary';
import './item.css';
import { IPokemon } from 'pokeapi-typescript';
import capitalize from '../../utils/capitalize';
import Description from '../description/Description';

export interface ItemProps extends IPokemon {}

export default class Item extends React.Component<ItemProps> {
  constructor(props: ItemProps) {
    super(props);
  }
  render() {
    return (
      <ErrorBoundary>
        <div className="item">
          <ErrorBoundary>
            <h3 className="item-name">{capitalize(this.props.name)}</h3>
          </ErrorBoundary>
          <ErrorBoundary>
            <img alt="Sprite" src={this.props.sprites.front_default} />
          </ErrorBoundary>
          <Description {...this.props} />
        </div>
      </ErrorBoundary>
    );
  }
}
