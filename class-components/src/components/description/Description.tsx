import React from 'react';
import ErrorBoundary from '../common/error-boundary/ErrorBoundary';
import './description.css';
import { IPokemon } from 'pokeapi-typescript';
import ItemDescription from './ItemDescription';

export interface ItemDescriptionProps extends IPokemon {}

export default class Description extends React.Component<ItemDescriptionProps> {
  constructor(props: ItemDescriptionProps) {
    super(props);
  }
  render() {
    return (
      <ErrorBoundary>
        <div className="description-container">
          <h5>Description</h5>
          <div className="description-table-block">
            <ItemDescription
              name="Abilities"
              content={this.props.abilities
                .map((ability) => ability.ability.name)
                .join(', ')}
            />
            <ItemDescription
              name="Height"
              content={this.props.height.toString()}
            />
            <ItemDescription
              name="Weight"
              content={this.props.weight.toString()}
            />
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}
