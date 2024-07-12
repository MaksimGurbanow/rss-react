import React from 'react';
import { ItemDetailsProps } from '../../types/props';
import Description from '../description/Description';
import Properties from '../properties/Properties';
import capitalize from '../../utils/capitalize';

const ItemDetails = ({
  description,
  price,
  rating,
  brand,
  title,
  images,
}: ItemDetailsProps) => {
  return (
    <div className="item-details">
      <h3 className="item-details-name">{capitalize(title)}</h3>
      <img alt="Sprite" src={images[0]} />
      <Description>{description}</Description>
      <Properties price={price} brand={brand} rating={rating} />
    </div>
  );
};

export default ItemDetails;
