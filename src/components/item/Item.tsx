'use client';

import './item.scss';
import capitalize from '../../utils/capitalize';
import { ItemProps } from '../../types/props';
import SaveButton from '../saveButton/SaveButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Item = ({ title, images, id }: ItemProps) => {
  const savedProducts = useSelector((state: RootState) => state.savedProducts);
  return (
    <div className="item" data-testid="item-container">
      {/* <Link href="/"> */}
      <h3 className="item-name" data-testid="item-name">
        {capitalize(title)}
      </h3>
      <img
        loading="lazy"
        role="presentation"
        decoding="async"
        alt="Sprite"
        src={images[0]}
        className="item-image"
        data-testid="item-image"
      />
      <SaveButton
        isSaved={!!savedProducts.find((product) => product.id === id)}
        id={id}
      />
      {/* </Link> */}
    </div>
  );
};

export default Item;
