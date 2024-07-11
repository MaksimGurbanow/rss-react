import React from 'react';
import ErrorBoundary from '../common/error-boundary/ErrorBoundary';
import Item from '../item/Item';
import './list.css';
import { ListProps } from '../../types/props';

const List = ({ items }: ListProps) => {
  return (
    <ErrorBoundary
      fallback={() => (
        <div>
          Oops... Error occured while mounting the items. Please inform us about
          your issue via this email: maksim20051708@gmail.com
        </div>
      )}
    >
      <div className="items-list">
        {items.map((item) => (
          <Item {...item} key={item.id} />
        ))}
      </div>
    </ErrorBoundary>
  );
};

export default List;
