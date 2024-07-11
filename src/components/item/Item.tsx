import React from 'react';
import ErrorBoundary from '../common/error-boundary/ErrorBoundary';
import './item.css';
import capitalize from '../../utils/capitalize';
import Properties from '../properties/Properties';
import Description from '../description/Description';
import { ItemProps } from '../../types/props';

const Item = ({
  title,
  images,
  description,
  price,
  brand,
  rating,
}: ItemProps) => {
  return (
    <div className="item">
      <h3 className="item-name">{capitalize(title)}</h3>
      <img alt="Sprite" src={images[0]} style={{ width: '50%' }} />
      <ErrorBoundary fallback={() => <div>Description is not mounted</div>}>
        <Description>{description}</Description>
      </ErrorBoundary>
      <ErrorBoundary fallback={() => <div>Properties are not mounted</div>}>
        <Properties price={price} brand={brand} rating={rating} />
      </ErrorBoundary>
    </div>
  );
};

export default Item;
