import React from 'react';
import ErrorBoundary from '../common/error-boundary/ErrorBoundary';
import Item from '../item/Item';
import { IPokemon } from 'pokeapi-typescript';
import './list.css';

interface ListProps {
  items: IPokemon[];
}

export default class List extends React.Component<ListProps> {
  constructor(props: ListProps) {
    super(props);
  }
  render() {
    return (
      <ErrorBoundary
        fallback={() => (
          <div>
            Oops... Something went wrong. Please inform us about your issue via
            this email: maksim20051708@gmail.com
          </div>
        )}
      >
        <div className="items-list">
          {this.props.items.map((item) => (
            <Item {...item} key={item.id} />
          ))}
        </div>
      </ErrorBoundary>
    );
  }
}
