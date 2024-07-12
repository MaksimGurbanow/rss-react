import React from 'react';
import './item.css';
import capitalize from '../../utils/capitalize';
import { ItemProps } from '../../types/props';
import { useNavigate } from 'react-router-dom';

const Item = ({ title, images, id }: ItemProps) => {
  const navigate = useNavigate();
  return (
    <div className="item" onClick={() => navigate(`details/${id}`)}>
      <h3 className="item-name">{capitalize(title)}</h3>
      <img alt="Sprite" src={images[0]} className="item-image" />
    </div>
  );
};

export default Item;
